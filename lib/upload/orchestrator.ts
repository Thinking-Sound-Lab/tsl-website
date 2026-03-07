import { ExploreAPI, type CompleteUploadPayload } from "../api/explore";
import { splitFileIntoChunks } from "./chunker";

interface UploadProgressCallback {
    (percentage: number): void;
}

export interface UploadMetadata {
    prompt: string;
    model_name: string;
    mime_type: string;
    width: number;
    height: number;
    item_type?: "image" | "video";
    tags?: string[];
    duration?: number;
    is_public?: boolean;
}

interface OrchestratorOptions {
    file: File;
    metadata: UploadMetadata;
    onProgress?: UploadProgressCallback;
    signal?: AbortSignal;
}

/**
 * Uploads a single part to S3 directly using XHR for progress tracking.
 * This bypasses apiClient to ensure native Authorization JWTs are not leaked to AWS.
 */
function uploadPartWithXHR(
    url: string,
    chunk: Blob,
    onProgress: (loaded: number) => void,
    signal?: AbortSignal
): Promise<string> {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        let aborted = false;

        if (signal) {
            signal.addEventListener("abort", () => {
                aborted = true;
                xhr.abort();
                reject(new Error("Upload aborted by user"));
            });
            if (signal.aborted) {
                return reject(new Error("Upload aborted by user"));
            }
        }

        xhr.upload.addEventListener("progress", (event) => {
            if (event.lengthComputable && !aborted) {
                onProgress(event.loaded);
            }
        });

        xhr.addEventListener("load", () => {
            if (aborted) return;
            if (xhr.status >= 200 && xhr.status < 300) {
                // S3 often returns ETags wrapped in double quotes
                const etag = xhr.getResponseHeader("ETag")?.replace(/"/g, "");
                if (etag) {
                    resolve(etag);
                } else {
                    reject(new Error("No ETag returned from S3"));
                }
            } else {
                reject(new Error(`S3 upload failed with status ${xhr.status}`));
            }
        });

        xhr.addEventListener("error", () => {
            if (!aborted) reject(new Error("Network error during S3 upload"));
        });

        // Initialize PUT request directly to S3 Region
        xhr.open("PUT", url);
        xhr.send(chunk);
    });
}

/**
 * Orchestrates the full multipart upload lifecycle:
 * 1. File validation & chunking (5MB limits)
 * 2. POST /upload/init (Get upload_id, upload_key, and first batch of URLs)
 * 3. XHR PUT parts concurrently (Max 3, Retries = 3)
 * 4. POST /upload/complete (Finalize AWS assembly + DB insert)
 * 5. POST /upload/abort (Cleans up orphaned chunks on failure/cancellation)
 */
export async function uploadOrchestrator({
    file,
    metadata,
    onProgress,
    signal,
}: OrchestratorOptions): Promise<void> {

    // 1. Chunk the file
    if (file.size > 50 * 1024 * 1024) {
        throw new Error("File size exceeds 50MB limit");
    }

    const chunks = splitFileIntoChunks(file);
    const totalParts = chunks.length;

    // Progress tracking state (aggregating bytes across all parallel requests)
    const partProgress = new Array(totalParts).fill(0);
    const updateProgress = () => {
        if (!onProgress) return;
        const totalUploaded = partProgress.reduce((sum, current) => sum + current, 0);
        const percentage = Math.min(100, Math.round((totalUploaded / file.size) * 100));
        onProgress(percentage);
    };

    let upload_id: string | undefined;
    let upload_key: string | undefined;

    try {
        // 2. Init Upload — returns upload_id, upload_key, and first batch of presigned URLs
        if (signal?.aborted) throw new Error("Aborted");
        const initRes = await ExploreAPI.initUpload(file.name, file.type, file.size, totalParts);
        upload_id = initRes.data.upload_id;
        upload_key = initRes.data.upload_key;

        let presignedUrls = initRes.data.urls;

        // If the init didn't return enough URLs (unlikely but safe), fetch more
        if (presignedUrls.length < totalParts) {
            if (signal?.aborted) throw new Error("Aborted");
            const moreUrls = await ExploreAPI.getUploadUrls(upload_key, upload_id, totalParts - presignedUrls.length);
            presignedUrls = [...presignedUrls, ...moreUrls.data];
        }

        if (presignedUrls.length !== totalParts) {
            throw new Error("Mismatch between requested parts and received URLs");
        }

        // 3. Upload Parts concurrently (Limit: 3)
        const CONCURRENCY_LIMIT = 3;
        const completedParts: { PartNumber: number; ETag: string }[] = [];
        let currentIndex = 0;

        const worker = async (): Promise<void> => {
            while (currentIndex < totalParts) {
                if (signal?.aborted) throw new Error("Aborted");

                const taskIndex = currentIndex++;
                const chunk = chunks[taskIndex];
                const presignedUrl = presignedUrls.find(p => p.part_number === chunk.partNumber)?.presigned_url;

                if (!presignedUrl) {
                    throw new Error(`Missing presigned URL for part ${chunk.partNumber}`);
                }

                // Chunk Retry Logic
                let retries = 3;
                let etag: string | null = null;
                let lastError: Error | undefined;

                while (retries > 0 && !etag) {
                    try {
                        if (signal?.aborted) throw new Error("Aborted");
                        etag = await uploadPartWithXHR(
                            presignedUrl,
                            chunk.chunk,
                            (loaded) => {
                                partProgress[taskIndex] = loaded;
                                updateProgress();
                            },
                            signal
                        );
                    } catch (err) {
                        const error = err as Error;
                        lastError = error;
                        retries--;
                        if (error.message === "Aborted" || error.message === "Upload aborted by user") break;

                        // Exponential backoff
                        if (retries > 0) {
                            await new Promise(r => setTimeout(r, (4 - retries) * 1000));
                        }
                    }
                }

                if (!etag) {
                    throw lastError || new Error(`Failed to upload part ${chunk.partNumber} after retries`);
                }

                completedParts.push({ PartNumber: chunk.partNumber, ETag: etag });
            }
        };

        const workers = Array.from({ length: Math.min(CONCURRENCY_LIMIT, totalParts) }).map(() => worker());
        await Promise.all(workers);

        if (signal?.aborted) throw new Error("Aborted");

        // 4. Complete Upload — flat body with parts + metadata
        completedParts.sort((a, b) => a.PartNumber - b.PartNumber);

        const completePayload: CompleteUploadPayload = {
            upload_key,
            upload_id,
            parts: completedParts,
            prompt: metadata.prompt,
            model_name: metadata.model_name,
            mime_type: metadata.mime_type || file.type,
            width: metadata.width,
            height: metadata.height,
            item_type: metadata.item_type,
            tags: metadata.tags,
            duration: metadata.duration,
            is_public: metadata.is_public,
        };

        await ExploreAPI.completeUpload(completePayload);

        // Upload success! Fill progress bar visually if calculation was off
        onProgress?.(100);

    } catch (error) {
        // 5. Handle Abort/Failure Cleanup
        if (upload_id && upload_key) {
            ExploreAPI.abortUpload(upload_key, upload_id).catch((e) => console.error("Failed to abort orphaned upload", e));
        }
        throw error;
    }
}
