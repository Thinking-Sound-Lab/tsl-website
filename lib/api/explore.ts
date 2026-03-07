import { apiClient } from "./apiClient";

// ─── Interfaces ────────────────────────────────

export interface ExploreItem {
    id: string;
    url: string;
    thumbnail_url?: string;
    prompt: string;
    model_name: string;
    mime_type: string;
    item_type: "image" | "video";
    width: number;
    height: number;
    tags?: string[];
    duration?: number;
    is_public?: boolean;
    created_at: string;
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
    id?: string;
    url: string;
    prompt: string;
    modelName: string;
    itemType?: "image" | "video";
    mimeType: string;
    width: number;
    height: number;
    tags?: string[];
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

export interface ExploreModel {
    label: string;
    value: string;
}

// ─── API Methods ───────────────────────────────

export const ExploreAPI = {
    /**
     * GET /api/explore
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
     * GET /api/explore/search
     * Used for dedicated keyword search
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
     */
    getModels: async (): Promise<{ success: boolean; data: ExploreModel[] }> => {
        return apiClient<{ success: boolean; data: ExploreModel[] }>("/api/explore/models", {
            method: "GET",
            requiresAuth: false,
        });
    },

    /**
     * POST /api/explore
     * Uses camelCase body per backend
     */
    createItem: async (payload: CreateItemPayload): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>("/api/explore", {
            method: "POST",
            body: JSON.stringify(payload),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/init
     * Uses snake_case body per backend
     */
    initUpload: async (
        filename: string,
        mime_type: string,
        file_size: number,
        part_count: number
    ): Promise<{ success: boolean; data: UploadInitResponse }> => {
        return apiClient<{ success: boolean; data: UploadInitResponse }>("/api/explore/upload/init", {
            method: "POST",
            body: JSON.stringify({ filename, mime_type, file_size, part_count }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/urls
     * Uses snake_case body per backend
     */
    getUploadUrls: async (
        upload_key: string,
        upload_id: string,
        part_count: number
    ): Promise<{ success: boolean; data: UploadPartUrl[] }> => {
        return apiClient<{ success: boolean; data: UploadPartUrl[] }>("/api/explore/upload/urls", {
            method: "POST",
            body: JSON.stringify({ upload_key, upload_id, part_count }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/complete
     * Uses camelCase body per backend
     */
    completeUpload: async (payload: CompleteUploadPayload): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>("/api/explore/upload/complete", {
            method: "POST",
            body: JSON.stringify(payload),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/upload/abort
     * Uses snake_case body per backend
     */
    abortUpload: async (upload_key: string, upload_id: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>("/api/explore/upload/abort", {
            method: "POST",
            body: JSON.stringify({ upload_key, upload_id }),
            requiresAuth: true,
        });
    },

    /**
     * POST /api/explore/:id/report
     */
    reportItem: async (id: string, reason: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>(`/api/explore/${id}/report`, {
            method: "POST",
            body: JSON.stringify({ reason }),
            requiresAuth: true,
        });
    },

    /**
     * GET /api/explore/user/:userId
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
     * PATCH /api/explore/:id
     */
    updateItem: async (id: string, payload: Partial<CreateItemPayload>): Promise<{ success: boolean; data: ExploreItem }> => {
        return apiClient<{ success: boolean; data: ExploreItem }>(`/api/explore/${id}`, {
            method: "PATCH",
            body: JSON.stringify(payload),
            requiresAuth: true,
        });
    },

    /**
     * DELETE /api/explore/:id
     */
    deleteItem: async (id: string): Promise<{ success: boolean }> => {
        return apiClient<{ success: boolean }>(`/api/explore/${id}`, {
            method: "DELETE",
            requiresAuth: true,
        });
    },
};
