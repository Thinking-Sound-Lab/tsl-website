/**
 * Centralized API Client — uses the shared axios instance from apiService.
 *
 * Delegates all auth logic to the axios interceptors in apiService.ts
 * (401 retry, refresh lock, token injection).
 */

import { api } from "../apiService";
import type { AxiosRequestConfig } from "axios";

export { ApiError, UnauthorizedError } from "../apiService";

interface FetchOptions {
    method?: string;
    body?: string;
    requiresAuth?: boolean;
    headers?: Record<string, string>;
}

/**
 * Wrapper around the shared axios instance for backward compatibility
 * with existing code that calls apiClient().
 */
export async function apiClient<T>(
    endpoint: string,
    { requiresAuth = true, method = "GET", body, headers }: FetchOptions = {}
): Promise<T> {
    const config: AxiosRequestConfig & { _skipAuth?: boolean } = {
        url: endpoint,
        method,
        _skipAuth: !requiresAuth,
        headers,
        withCredentials: true,
    };

    if (body) {
        config.data = typeof body === "string" ? JSON.parse(body) : body;
    }

    const response = await api(config);
    return response.data as T;
}
