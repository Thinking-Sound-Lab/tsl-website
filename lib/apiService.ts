/**
 * BackendAPIService — Centralized HTTP client using Axios with:
 * - Automatic Bearer token injection from tokenStore
 * - 401 interceptor with single-flight refresh + retry
 * - Refresh lock (isRefreshing) to prevent concurrent refresh races
 */

import axios, {
    AxiosError,
    type AxiosRequestConfig,
    type InternalAxiosRequestConfig,
} from "axios";

import {
    getTokenStore,
    setTokenStore,
    getUser,
    clearAll,
    type TokenStoreData,
} from "./tokenStore";

// ─── Error Types ───────────────────────────────

export class UnauthorizedError extends Error {
    constructor(message = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export class ApiError extends Error {
    public status: number;
    constructor({ message, status }: { message: string; status: number }) {
        super(message);
        this.name = "ApiError";
        this.status = status;
    }
}

// ─── Refresh Queue ─────────────────────────────

type QueueSubscriber = (token: string | null) => void;

let isRefreshing = false;
let refreshSubscribers: QueueSubscriber[] = [];

function onRefreshComplete(newToken: string | null) {
    refreshSubscribers.forEach((cb) => cb(newToken));
    refreshSubscribers = [];
}

function waitForRefresh(): Promise<string | null> {
    return new Promise((resolve) => {
        refreshSubscribers.push(resolve);
    });
}

// ─── Axios Instance ────────────────────────────

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

export const api = axios.create({
    baseURL: backendUrl,
    headers: { "Content-Type": "application/json" },
});

// ── Request Interceptor — inject token ─────────

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    // Skip auth if explicitly flagged
    if ((config as InternalAxiosRequestConfig & { _skipAuth?: boolean })._skipAuth) return config;

    const store = getTokenStore();
    if (store?.accessToken) {
        config.headers.Authorization = `Bearer ${store.accessToken}`;
    }
    return config;
});

// ── Response Interceptor — 401 retry ───────────

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
            _skipAuth?: boolean;
        };

        // Only handle 401 on authenticated requests
        if (error.response?.status !== 401 || originalRequest._skipAuth || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        // If someone else is already refreshing, queue this request
        if (isRefreshing) {
            const newToken = await waitForRefresh();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return api(originalRequest);
            }
            redirectToLogin();
            return Promise.reject(new UnauthorizedError("Session expired. Please log in again."));
        }

        // We are the first caller to hit 401 — attempt refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            const newStore = getTokenStore();
            if (newStore?.accessToken) {
                originalRequest.headers.Authorization = `Bearer ${newStore.accessToken}`;
                return api(originalRequest);
            }
        }

        // Refresh failed completely
        redirectToLogin();
        return Promise.reject(new UnauthorizedError("Session expired. Please log in again."));
    }
);

// ─── Legacy request() wrapper ──────────────────
// Keeps backward-compat with existing code that uses request<T>(endpoint, options)

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
}

export async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { skipAuth = false, method = "GET", body, headers: customHeaders } = options;

    const config: AxiosRequestConfig & { _skipAuth?: boolean } = {
        url: endpoint,
        method: method as string,
        _skipAuth: skipAuth,
        headers: customHeaders as Record<string, string>,
    };

    if (body) {
        config.data = typeof body === "string" ? JSON.parse(body) : body;
    }

    const response = await api(config);
    return response.data as T;
}

function redirectToLogin() {
    clearAll();
    if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
    }
}

// ─── Token Refresh ─────────────────────────────

/**
 * POSTs the refresh token to /api/auth/refresh.
 * On success, saves new tokens to localStorage and notifies all queued callers.
 * Returns true if refresh succeeded, false otherwise.
 */
export async function refreshAccessToken(): Promise<boolean> {
    const store = getTokenStore();
    if (!store?.refreshToken) {
        onRefreshComplete(null);
        return false;
    }

    isRefreshing = true;

    try {
        const response = await axios.post(`${backendUrl}/api/auth/refresh`, {
            refreshToken: store.refreshToken,
        });

        const data = response.data;
        const { access_token, refresh_token, expires_in } = data.data || data;

        if (!access_token) {
            onRefreshComplete(null);
            return false;
        }

        const newStore: TokenStoreData = {
            accessToken: access_token,
            refreshToken: refresh_token || store.refreshToken,
            expiresIn: expires_in || 3600,
            tokenExpiresAt: Date.now() + (expires_in || 3600) * 1000,
        };

        setTokenStore(newStore);
        onRefreshComplete(access_token);
        return true;
    } catch {
        onRefreshComplete(null);
        return false;
    } finally {
        isRefreshing = false;
    }
}

// ─── Auth Verification ─────────────────────────

export async function verifyToken(): Promise<{ userId: string; email: string } | null> {
    try {
        const response = await api.get<{ data: { userId: string; email: string } }>("/api/auth/verify");
        return response.data.data;
    } catch {
        return null;
    }
}

// ─── Logout ────────────────────────────────────

export async function logout(): Promise<void> {
    const store = getTokenStore();
    const user = getUser();

    // Best-effort server logout
    try {
        await axios.post(`${backendUrl}/api/auth/logout`, {
            refreshToken: store?.refreshToken || "",
            userId: user?.userId || "",
        });
    } catch {
        // Always succeeds conceptually — clear local state regardless
    }

    clearAll();
}
