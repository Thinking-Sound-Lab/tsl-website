import { apiClient } from "./apiClient";

export interface ExplorePostPayload {
    url: string;
    thumbnail_url?: string;
    item_type: "image" | "video" | "canvas";
    title: string;
    prompt: string;
    model_name: string;
    tags: string[];
    width?: number;
    height?: number;
    duration?: number;
}

export const ExploreAPI = {
    /**
     * Gets the public explore gallery posts.
     */
    getPosts: async (page = 1, limit = 30) => {
        return apiClient(`/api/explore?page=${page}&limit=${limit}`, {
            method: "GET",
            requiresAuth: false,
        });
    },

    /**
     * Gets public model names to filter by and upload with.
     */
    getModels: async () => {
        return apiClient<{ models: string[] }>("/api/explore/models", {
            method: "GET",
            requiresAuth: false,
        });
    },

    /**
     * Submits a report for a specific explore item.
     * Protected Route.
     */
    reportPost: async (postId: string, reason: string) => {
        return apiClient(`/api/explore/${postId}/report`, {
            method: "POST",
            body: JSON.stringify({ reason }),
            requiresAuth: true,
        });
    },

    // --- Upload Specific Methods (Used by Orchestrator) ---
    initUpload: async (filename: string, fileType: string, fileSize: number) => {
        return apiClient<{ uploadId: string; fileKey: string }>("/api/explore/upload/init", {
            method: "POST",
            body: JSON.stringify({ filename, fileType, fileSize }),
            requiresAuth: true,
        });
    },

    getUploadUrls: async (uploadId: string, fileKey: string, partsCount: number) => {
        return apiClient<{ presignedUrls: { partNumber: number; url: string }[] }>("/api/explore/upload/urls", {
            method: "POST",
            body: JSON.stringify({ uploadId, fileKey, partsCount }),
            requiresAuth: true,
        });
    },

    completeUpload: async (
        uploadId: string,
        fileKey: string,
        parts: { PartNumber: number; ETag: string }[],
        metadata: ExplorePostPayload
    ) => {
        return apiClient("/api/explore/upload/complete", {
            method: "POST",
            body: JSON.stringify({ uploadId, fileKey, parts, metadata }),
            requiresAuth: true,
        });
    },

    abortUpload: async (uploadId: string, fileKey: string) => {
        return apiClient("/api/explore/upload/abort", {
            method: "POST",
            body: JSON.stringify({ uploadId, fileKey }),
            requiresAuth: true,
        });
    },
};
