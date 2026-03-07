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

        xhr.open("PUT", url);
        xhr.send(chunk);
    });
}

export async function uploadOrchestrator({
    file,
    metadata,
    onProgress,
    signal,
}: OrchestratorOptions): Promise<void> {

    if (file.size > 50 * 1024 * 1024) {
        throw new Error("File size exceeds 50MB limit");
    }

    const chunks = splitFileIntoChunks(file);
    const totalParts = chunks.length;

    const partProgress = new Array(totalParts).fill(0);
    const updateProgress = () => {
        if (!onProgress) return;
        const totalUploaded = partProgress.reduce((sum, current) => sum + current, 0);
        const percentage = Math.min(100, Math.round((totalUploaded / file.size) * 100));
        onProgress(percentage);
    };

    let uploadId: string | undefined;
    let uploadKey: string | undefined;

    try {
        if (signal?.aborted) throw new Error("Aborted");
        
        // initUpload uses snake_case arguments for body fields
        const initRes = await ExploreAPI.initUpload(file.name, file.type, file.size, totalParts);
        uploadId = initRes.data.uploadId;
        uploadKey = initRes.data.uploadKey;

        let presignedUrls = initRes.data.urls;

        if (presignedUrls.length < totalParts) {
            if (signal?.aborted) throw new Error("Aborted");
            const moreUrls = await ExploreAPI.getUploadUrls(uploadKey, uploadId, totalParts - presignedUrls.length);
            presignedUrls = [...presignedUrls, ...moreUrls.data];
        }

        const CONCURRENCY_LIMIT = 3;
        const completedParts: { PartNumber: number; ETag: string }[] = [];
        let currentIndex = 0;

        const worker = async (): Promise<void> => {
            while (currentIndex < totalParts) {
                if (signal?.aborted) throw new Error("Aborted");

                const taskIndex = currentIndex++;
                const chunk = chunks[taskIndex];
                const presignedUrl = presignedUrls.find(p => p.partNumber === chunk.partNumber)?.presignedUrl;

                if (!presignedUrl) {
                    throw new Error(`Missing presigned URL for part ${chunk.partNumber}`);
                }

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

        completedParts.sort((a, b) => a.PartNumber - b.PartNumber);

        // completeUpload uses camelCase properties for payload body
        const completePayload: CompleteUploadPayload = {
            uploadKey: uploadKey!,
            uploadId: uploadId!,
            parts: completedParts,
            prompt: metadata.prompt,
            modelName: metadata.model_name,
            mimeType: metadata.mime_type || file.type,
            width: metadata.width,
            height: metadata.height,
            itemType: metadata.item_type,
            tags: metadata.tags,
            duration: metadata.duration,
            isPublic: metadata.is_public,
        };

        await ExploreAPI.completeUpload(completePayload);
        onProgress?.(100);

    } catch (error) {
        if (uploadId && uploadKey) {
            ExploreAPI.abortUpload(uploadKey, uploadId).catch((e) => console.error("Failed to abort orphaned upload", e));
        }
        throw error;
    }
}
