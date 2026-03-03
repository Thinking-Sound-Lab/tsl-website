import { ExploreAPI, ExplorePostPayload } from "../api/explore";
import { splitFileIntoChunks } from "./chunker";

interface UploadProgressCallback {
    (percentage: number): void;
}

interface OrchestratorOptions {
    file: File;
    metadata: ExplorePostPayload;
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
 * 2. POST /init (Get uploadId)
 * 3. POST /urls (Get Presigned S3 URLs)
 * 4. XHR PUT parts concurrently (Max 3, Retries = 3)
 * 5. POST /complete (Finalize AWS assembly + Supabase insert)
 * 6. POST /abort (Cleans up orphaned chunks on failure/cancellation)
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

    let uploadId: string | undefined;
    let fileKey: string | undefined;

    try {
        // 2. Init Upload
        if (signal?.aborted) throw new Error("Aborted");
        const initRes = await ExploreAPI.initUpload(file.name, file.type, file.size);
        uploadId = initRes.uploadId;
        fileKey = initRes.fileKey;

        // 3. Get Presigned URLs
        if (signal?.aborted) throw new Error("Aborted");
        const urlsRes = await ExploreAPI.getUploadUrls(uploadId, fileKey, totalParts);
        const presignedUrls = urlsRes.presignedUrls;

        if (presignedUrls.length !== totalParts) {
            throw new Error("Mismatch between requested parts and received URLs");
        }

        // 4. Upload Parts concurrently (Limit: 3)
        const CONCURRENCY_LIMIT = 3;
        const completedParts: { PartNumber: number; ETag: string }[] = [];
        let currentIndex = 0;

        const worker = async (): Promise<void> => {
            while (currentIndex < totalParts) {
                if (signal?.aborted) throw new Error("Aborted");

                const taskIndex = currentIndex++;
                const chunk = chunks[taskIndex];
                const presignedUrl = presignedUrls.find(p => p.partNumber === chunk.partNumber)?.url;

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

        // 5. Complete Upload
        // Sort parts by PartNumber sequentially as required by AWS S3 Multipart API
        completedParts.sort((a, b) => a.PartNumber - b.PartNumber);

        await ExploreAPI.completeUpload(uploadId, fileKey, completedParts, metadata);

        // Upload success! Fill progress bar visually if calculation was off
        onProgress?.(100);

    } catch (error) {
        // 6. Handle Abort/Failure Cleanup
        if (uploadId && fileKey) {
            // Fire-and-forget abort endpoint to trigger AWS S3 to delete the orphaned multipart chunks
            ExploreAPI.abortUpload(uploadId, fileKey).catch((e) => console.error("Failed to abort orphaned upload", e));
        }
        throw error;
    }
}
