/**
 * Centralized API Client — refactored to use tokenStore (localStorage)
 * instead of Supabase getSession().
 *
 * Delegates all auth logic to apiService.ts (401 retry, refresh lock).
 */

import { request, type ApiError, type UnauthorizedError } from "../apiService";

export { ApiError, UnauthorizedError };

interface FetchOptions extends RequestInit {
    requiresAuth?: boolean;
}

/**
 * Wrapper around the core request() function for backward compatibility
 * with existing code that calls apiClient().
 */
export async function apiClient<T>(
    endpoint: string,
    { requiresAuth = true, ...customConfig }: FetchOptions = {}
): Promise<T> {
    return request<T>(endpoint, {
        ...customConfig,
        skipAuth: !requiresAuth,
    });
}
