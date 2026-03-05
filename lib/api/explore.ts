/**
 * Explore API — all endpoints for the public explore gallery.
 *
 * Uses the shared axios instance (via apiClient) which handles
 * token injection, 401 retry, and refresh automatically.
 */

import { apiClient } from "./apiClient";

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
    urls: { partNumber: number; presignedUrl: string }[];
}

export interface UploadPartUrl {
    partNumber: number;
    presignedUrl: string;
}

export interface CreateItemPayload {
    url: string;
    thumbnailUrl?: string;
    itemType?: "image" | "video";
    mimeType: string;
    prompt: string;
    modelName: string;
    tags?: string[];
    width: number;
    height: number;
    duration?: number;
    isPublic?: boolean;
}

export interface CompleteUploadPayload {
    uploadKey: string;
    uploadId: string;
    parts: { PartNumber: number; ETag: string }[];
    prompt: string;
    modelName: string;
    mimeType: string;
    width: number;
    height: number;
    itemType?: "image" | "video";
    tags?: string[];
    duration?: number;
    isPublic?: boolean;
}

// ─── API Methods ───────────────────────────────

export const ExploreAPI = {
    /**
     * GET /api/explore
     * Paginated public explore items with optional filtering.
     */
    getPosts: async (
        page = 1,
        limit = 30,
        filters?: { model_name?: string; item_type?: string; tag?: string }
    ): Promise<{ success: boolean; data: ExploreListResponse }> => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (filters?.model_name) params.set("model_name", filters.model_name);
        if (filters?.item_type) params.set("item_type", filters.item_type);
        if (filters?.tag) params.set("tag", filters.tag);

        return apiClient<{ success: boolean; data: ExploreListResponse }>(
            `/api/explore?${params.toString()}`,
            { method: "GET", requiresAuth: false }
        );
    },

    /**
     * GET /api/explore/models
     * Distinct model names available in the explore feed.
     */
    getModels: async (): Promise<{ success: boolean; data: string[] }> => {
        return apiClient<{ success: boolean; data: string[] }>("/api/explore/models", {
            method: "GET",
            requiresAuth: false,
        });
    },

    /**
     * GET /api/explore/:id
     * Single explore item detail by ID.
     */
    getPostById: async (id: string): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>(`/api/explore/${id}`, {
            method: "GET",
            requiresAuth: false,
        });
    },

    /**
     * POST /api/explore
     * Create an explore item (metadata already known).
     */
    createPost: async (payload: CreateItemPayload): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>("/api/explore", {
            method: "POST",
            body: JSON.stringify(payload),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/init
     * Initiate multipart upload and get first batch of presigned part URLs.
     */
    initUpload: async (
        filename: string,
        mimeType: string,
        fileSize: number,
        partCount: number
    ): Promise<{ success: boolean; data: UploadInitResponse }> => {
        return apiClient<{ success: boolean; data: UploadInitResponse }>("/api/explore/upload/init", {
            method: "POST",
            body: JSON.stringify({
                filename,
                file_size: fileSize,
                mime_type: mimeType,
                part_count: partCount,
            }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/urls
     * Get additional presigned part URLs for an in-progress upload.
     */
    getUploadUrls: async (
        uploadKey: string,
        uploadId: string,
        partCount: number
    ): Promise<{ success: boolean; data: UploadPartUrl[] }> => {
        return apiClient<{ success: boolean; data: UploadPartUrl[] }>("/api/explore/upload/urls", {
            method: "POST",
            body: JSON.stringify({
                upload_key: uploadKey,
                upload_id: uploadId,
                part_count: partCount,
            }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/complete
     * Finalize multipart upload and create explore item record.
     */
    completeUpload: async (
        payload: CompleteUploadPayload
    ): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>("/api/explore/upload/complete", {
            method: "POST",
            body: JSON.stringify(payload),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/abort
     * Cancel an in-progress multipart upload.
     */
    abortUpload: async (uploadKey: string, uploadId: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>("/api/explore/upload/abort", {
            method: "POST",
            body: JSON.stringify({
                upload_key: uploadKey,
                upload_id: uploadId,
            }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/:id/report
     * Report an explore item — one report per user per item.
     */
    reportPost: async (postId: string, reason: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>(`/api/explore/${postId}/report`, {
            method: "POST",
            body: JSON.stringify({ reason }),
            requiresAuth: true,
        });
    },

    /**
     * DELETE /api/explore/:id
     * Owner removes their own explore item.
     */
    deletePost: async (postId: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>(`/api/explore/${postId}`, {
            method: "DELETE",
            requiresAuth: true,
        });
    },
};
