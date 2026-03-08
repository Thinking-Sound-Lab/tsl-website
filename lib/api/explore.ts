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
    upload_id: string;
    upload_key: string;
    urls: { part_number: number; presigned_url: string }[];
}

export interface UploadPartUrl {
    part_number: number;
    presigned_url: string;
}

export interface CreateItemPayload {
    url: string;
    thumbnail_url?: string;
    item_type?: "image" | "video";
    mime_type: string;
    prompt: string;
    model_name: string;
    tags?: string[];
    width: number;
    height: number;
    duration?: number;
    is_public?: boolean;
}

export interface UpdateItemPayload {
    prompt?: string;
    tags?: string[];
}

export interface CompleteUploadPayload {
    upload_key: string;
    upload_id: string;
    parts: { PartNumber: number; ETag: string }[];
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

// ─── API Methods ───────────────────────────────

export const ExploreAPI = {
    /**
     * GET /api/explore
     * Paginated public explore items with optional filtering.
     */
    getPosts: async (
        page = 1,
        limit = 30,
        filters?: { model_name?: string; item_type?: string; tag?: string; q?: string }
    ): Promise<{ success: boolean; data: ExploreListResponse }> => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (filters?.model_name) params.set("model_name", filters.model_name);
        if (filters?.item_type) params.set("item_type", filters.item_type);
        if (filters?.tag) params.set("tag", filters.tag);
        if (filters?.q) params.set("q", filters.q);

        return apiClient<{ success: boolean; data: ExploreListResponse }>(
            `/api/explore?${params.toString()}`,
            { method: "GET", requiresAuth: false }
        );
    },

    /**
     * GET /api/explore/user/:userId
     * Paginated items for a specific user.
     */
    getUserPosts: async (
        userId: string,
        page = 1,
        limit = 30,
        filters?: { model_name?: string; item_type?: string }
    ): Promise<{ success: boolean; data: ExploreListResponse }> => {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        if (filters?.model_name) params.set("model_name", filters.model_name);
        if (filters?.item_type) params.set("item_type", filters.item_type);

        return apiClient<{ success: boolean; data: ExploreListResponse }>(
            `/api/explore/user/${userId}?${params.toString()}`,
            { method: "GET", requiresAuth: true }
        );
    },

    /**
     * GET /api/explore/search
     * Search explore items by query string.
     */
    searchPosts: async (
        q: string,
        page = 1,
        limit = 30
    ): Promise<{ success: boolean; data: ExploreListResponse }> => {
        const params = new URLSearchParams({ q, page: String(page), limit: String(limit) });

        return apiClient<{ success: boolean; data: ExploreListResponse }>(
            `/api/explore/search?${params.toString()}`,
            { method: "GET", requiresAuth: false }
        );
    },

    /**
     * GET /api/explore/models
     * Distinct model names available in the explore feed.
     */
    getModels: async (): Promise<{ success: boolean; data: ExploreModel[] }> => {
        return apiClient<{ success: boolean; data: ExploreModel[] }>("/api/explore/models", {
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
     * PATCH /api/explore/:id
     * Update metadata for an explore item.
     */
    updateItem: async (
        id: string,
        payload: UpdateItemPayload
    ): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>(`/api/explore/${id}`, {
            method: "PATCH",
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
    reportItem: async (postId: string, reason: string): Promise<{ success: boolean }> => {
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
    deleteItem: async (postId: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>(`/api/explore/${postId}`, {
            method: "DELETE",
            requiresAuth: true,
        });
    },
};
