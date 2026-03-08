/**
 * apiService.ts — Production-Grade HTTP Client
 *
 * This service handles all direct communication with the backend.
 * Features:
 * - Direct Access: Base URL points to NEXT_PUBLIC_BACKEND_URL.
 * - Auto-Auth: Injects Bearer tokens from localStorage.
 * - Silent Refresh: Intercepts 401s, queues requests, refreshes token, and retries.
 * - Loop Safety: Prevents infinite redirect loops on sign-in pages.
 */

import axios, {
    AxiosError,
    type InternalAxiosRequestConfig,
    type AxiosResponse
} from "axios";

import {
    getTokenStore,
    setTokenStore,
    clearAll,
    type TokenStoreData,
} from "./tokenStore";

// ─── Configuration ─────────────────────────────

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class ApiError extends Error {
    public status: number;
    public data: unknown;
    constructor({ message, status, data }: { message: string; status: number; data?: unknown }) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.data = data;
    }
}

// ─── Axios Instance ────────────────────────────

export const api = axios.create({
    baseURL: BACKEND_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Important for CORS if needed, or if backend sets cookies
});

// ─── Request Interceptor (Inject Token) ────────

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // Skip auth if explicitly flagged (e.g. for public endpoints)
        const customConfig = config as InternalAxiosRequestConfig & { _skipAuth?: boolean };
        if (customConfig._skipAuth) return config;

        const store = getTokenStore();
        if (store?.accessToken) {
            config.headers.Authorization = `Bearer ${store.accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ─── Response Interceptor (Handle 401 & Refresh)

let isRefreshing = false;
let refreshSubscribers: ((token: string | null) => void)[] = [];

function onRefreshed(token: string | null) {
    refreshSubscribers.map((callback) => callback(token));
    refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (token: string | null) => void) {
    refreshSubscribers.push(callback);
}

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean, _skipAuth?: boolean };

        // If error is not 401, or request was skipped auth, or already retried -> reject
        if (error.response?.status !== 401 || originalRequest._skipAuth || originalRequest._retry) {
            // Transform error to ApiError for cleaner handling
            if (error.response) {
                const responseData = error.response.data as Record<string, unknown>;
                return Promise.reject(new ApiError({
                    message: (responseData.error as string) || error.message,
                    status: error.response.status,
                    data: error.response.data
                }));
            }
            return Promise.reject(error);
        }

        if (isRefreshing) {
            // Wait for the ongoing refresh
            return new Promise((resolve, reject) => {
                addRefreshSubscriber((token: string | null) => {
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(api(originalRequest));
                    } else {
                        reject(new UnauthorizedError("Session expired"));
                    }
                });
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
            const success = await refreshAccessToken();
            if (success) {
                const store = getTokenStore();
                if (store?.accessToken) {
                    onRefreshed(store.accessToken);
                    originalRequest.headers.Authorization = `Bearer ${store.accessToken}`;
                    return api(originalRequest);
                }
            }
            
            // Refresh failed
            handleSessionExpiry();
            return Promise.reject(new UnauthorizedError("Session expired"));
        } catch (refreshError) {
            handleSessionExpiry();
            return Promise.reject(refreshError);
        } finally {
            isRefreshing = false;
        }
    }
);

// ─── Helper Functions ──────────────────────────

function handleSessionExpiry() {
    onRefreshed(null); // Notify waiting requests
    clearAll(); // Clear local storage

    if (typeof window !== "undefined") {
        const path = window.location.pathname;
        // Prevent redirect loop if already on auth pages
        if (path !== "/sign-in" && path !== "/sign-up") {
            window.location.href = `/sign-in?redirect=${encodeURIComponent(path)}`;
        }
    }
}

/**
 * refreshAccessToken
 * Calls the backend directly to refresh the token using the stored refresh token.
 */
export async function refreshAccessToken(): Promise<boolean> {
    const store = getTokenStore();
    if (!store?.refreshToken) return false;

    try {
        // Use a fresh axios instance to avoid interceptors
        const response = await axios.post(`${BACKEND_URL}/api/auth/refresh`, {
            refreshToken: store.refreshToken,
        });

        const data = response.data;
        const { access_token, refresh_token, expires_in } = data.data || data;

        if (!access_token) return false;

        const newStore: TokenStoreData = {
            accessToken: access_token,
            refreshToken: refresh_token || store.refreshToken,
            expiresIn: expires_in || 3600,
            tokenExpiresAt: Date.now() + (expires_in || 3600) * 1000,
        };

        setTokenStore(newStore);
        return true;
    } catch (e) {
        console.error("Token refresh failed", e);
        return false;
    }
}

/**
 * verifyToken
 * Checks if the current session is valid.
 * Does NOT trigger a redirect on 401 (uses _skipAuth or handled gracefully).
 */
export async function verifyToken(): Promise<{ userId: string; email: string } | null> {
    try {
        // We use the main 'api' instance but rely on its interceptor.
        // If it fails with 401, the interceptor will try to refresh.
        // If refresh fails, it rejects. catch() handles it.
        const response = await api.get<{ data: { userId: string; email: string } }>("/api/auth/verify");
        return response.data.data;
    } catch {
        // If 401 happens and refresh fails, we return null (not authenticated)
        return null;
    }
}

/**
 * logout
 * Calls backend logout and clears local state.
 */
export async function logout(): Promise<void> {
    const store = getTokenStore();
    if (store?.refreshToken) {
        try {
            await axios.post(`${BACKEND_URL}/api/auth/logout`, {
                refreshToken: store.refreshToken,
            });
        } catch {
            // Ignore logout errors
        }
    }
    handleSessionExpiry();
}
