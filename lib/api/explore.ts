/**
 * Explore API — all endpoints for the public explore gallery.
 */

import { api } from "../apiService";
import axios, { AxiosRequestConfig } from "axios";

// ─── Types ─────────────────────────────────────

export interface ExploreItem {
    id: string;
    user_id: string;
    item_type: "image" | "video";
    mime_type: string;
    url: string;
    thumbnail_url: string | null;
    prompt: string;
    model_name: string;
    tags: string[];
    width: number;
    height: number;
    duration: number | null;
    is_public: boolean;
    created_at: string;
    updated_at?: string;
}

export interface ExploreModel {
    value: string;
    label: string;
}

export interface ExploreListResponse {
    data: ExploreItem[];
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}

export interface UploadInitResponse {
    uploadId: string;
    uploadKey: string;
    urls: { partNumber: number; url: string }[];
    exploreItem: ExploreItem;
}

export interface UploadMetadata {
    prompt: string;
    model_name: string;
    width: number;
    height: number;
    item_type?: "image" | "video";
    tags?: string[];
    duration?: number;
    is_public?: boolean;
    mime_type?: string;
}

interface ApiResponse<T> {
    success: boolean;
    data: T;
}

/**
 * Custom request config to allow our custom _skipAuth flag
 */
interface CustomRequestConfig extends AxiosRequestConfig {
    _skipAuth?: boolean;
}

// ─── API Methods ───────────────────────────────

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB (Matches backend DEFAULT_PART_SIZE)

export const ExploreAPI = {
    getPosts: async (
        page = 1,
        limit = 30,
        filters?: { model_name?: string; item_type?: string; tag?: string; q?: string }
    ): Promise<ApiResponse<ExploreListResponse>> => {
        const response = await api.get<ApiResponse<ExploreListResponse>>("/api/explore", {
            params: { page, limit, ...filters },
            _skipAuth: true,
        } as CustomRequestConfig);
        return response.data;
    },

    searchPosts: async (
        q: string,
        page = 1,
        limit = 30
    ): Promise<ApiResponse<ExploreListResponse>> => {
        const response = await api.get<ApiResponse<ExploreListResponse>>("/api/explore/search", {
            params: { q, page, limit },
            _skipAuth: true,
        } as CustomRequestConfig);
        return response.data;
    },

    getModels: async (): Promise<ApiResponse<ExploreModel[]>> => {
        const response = await api.get<ApiResponse<ExploreModel[]>>("/api/explore/models", {
            _skipAuth: true,
        } as CustomRequestConfig);
        return response.data;
    },

    getUserPosts: async (
        userId: string,
        page = 1,
        limit = 30,
        filters?: { model_name?: string; item_type?: string }
    ): Promise<ApiResponse<ExploreListResponse>> => {
        const response = await api.get<ApiResponse<ExploreListResponse>>(`/api/explore/user/${userId}`, {
            params: { page, limit, ...filters },
        });
        return response.data;
    },

    updateItem: async (
        id: string,
        payload: { prompt?: string; tags?: string[] }
    ): Promise<ApiResponse<ExploreItem>> => {
        const response = await api.patch<ApiResponse<ExploreItem>>(`/api/explore/${id}`, payload);
        return response.data;
    },

    /**
     * uploadFile
     * Orchestrates: init -> upload parts -> complete
     */
    uploadFile: async (
        file: File,
        metadata: UploadMetadata,
        onProgress?: (percentage: number) => void,
        signal?: AbortSignal
    ): Promise<ExploreItem> => {
        let uploadId: string | undefined;
        let uploadKey: string | undefined;

        try {
            // 1. Init
            // The backend requires these exactly: filename, file_size, mime_type, prompt, modelName, width, height
            // It will 400 if any are falsy (like empty strings).
            const { data: initRes } = await api.post<ApiResponse<UploadInitResponse>>("/api/explore/upload/init", {
                filename: file.name,
                file_size: file.size,
                mime_type: file.type,
                prompt: metadata.prompt || "No prompt provided",
                modelName: metadata.model_name || "standard",
                width: Number(metadata.width) || 1024,
                height: Number(metadata.height) || 1024,
                itemType: metadata.item_type || (file.type.startsWith("video/") ? "video" : "image"),
                tags: metadata.tags || [],
                duration: metadata.duration != null ? Number(metadata.duration) : null,
                isPublic: metadata.is_public !== false,
            });

            console.log("Upload Init Response:", initRes);

            uploadId = initRes.data.uploadId;
            uploadKey = initRes.data.uploadKey;
            const urls = initRes.data.urls || [];

            if (!urls.length) {
                console.error("No upload URLs returned from init", initRes);
                throw new Error("Failed to initiate upload: No upload URLs received.");
            }

            // 2. Upload Parts
            // Create a fresh instance to avoid global interceptors (like auth headers) on S3 URLs
            const s3Axios = axios.create();
            delete s3Axios.defaults.headers.common["Authorization"];

            const partProgress = new Array(urls.length).fill(0);
            const completedParts = await Promise.all(
                urls.map(async (part: { partNumber?: number; url?: string; presignedUrl?: string }, index) => {
                    // Extract URL using the correct property name from backend response
                    const partNumber = part.partNumber || (part as Record<string, unknown>).PartNumber as number || (index + 1);
                    const url = part.presignedUrl || part.url || (part as Record<string, unknown>).signedUrl as string;
                    
                    if (!url) {
                        console.error(`Missing URL for part ${partNumber}`, part);
                        throw new Error(`Invalid upload URL for part ${partNumber}. Object keys: ${Object.keys(part).join(", ")}`);
                    }

                    const start = (partNumber - 1) * CHUNK_SIZE;
                    const chunk = file.slice(start, start + CHUNK_SIZE);

                    // Ensure URL is absolute. If backend returns relative path (e.g. /s3-proxy/...), prepend backend URL.
                    let uploadUrl = url;
                    if (url.startsWith("/")) {
                        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
                        // Remove trailing slash from backendUrl if present to avoid double slash
                        const cleanBackendUrl = backendUrl.endsWith("/") ? backendUrl.slice(0, -1) : backendUrl;
                        uploadUrl = `${cleanBackendUrl}${url}`;
                    }

                    try {
                        // S3 upload — direct axios call
                        // Explicitly set Content-Type to match what was signed (likely the file's mime type)
                        const res = await s3Axios.put(uploadUrl, chunk, {
                            signal,
                            headers: {
                                "Content-Type": file.type || "application/octet-stream"
                            },
                            onUploadProgress: (e) => {
                                partProgress[index] = e.loaded || 0;
                                const totalUploaded = partProgress.reduce((a, b) => a + b, 0);
                                onProgress?.(Math.min(Math.round((totalUploaded / file.size) * 100), 99));
                            },
                        });

                        const etag = res.headers.etag?.replace(/"/g, "");
                        if (!etag) throw new Error(`Missing ETag for part ${partNumber}`);
                        return { PartNumber: partNumber, ETag: etag };
                    } catch (err) {
                        console.error(`Failed to upload part ${partNumber} to ${uploadUrl}`, err);
                        throw err;
                    }
                })
            );

            // 3. Complete
            const { data: completeRes } = await api.post<ApiResponse<ExploreItem>>("/api/explore/upload/complete", {
                uploadKey,
                uploadId,
                parts: completedParts
            });

            onProgress?.(100);
            return completeRes.data;
        } catch (error) {
            if (uploadId && uploadKey) {
                api.post("/api/explore/upload/abort", {
                    upload_id: uploadId,
                    upload_key: uploadKey,
                }).catch(() => {});
            }
            throw error;
        }
    },

    reportItem: async (postId: string, reason: string): Promise<ApiResponse<void>> => {
        const response = await api.post<ApiResponse<void>>(`/api/explore/${postId}/report`, { reason });
        return response.data;
    },

    deleteItem: async (postId: string): Promise<ApiResponse<void>> => {
        const response = await api.delete<ApiResponse<void>>(`/api/explore/${postId}`);
        return response.data;
    },
};
