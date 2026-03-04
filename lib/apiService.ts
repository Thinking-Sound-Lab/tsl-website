/**
 * BackendAPIService — Centralized HTTP client with:
 * - Automatic Bearer token injection from tokenStore
 * - 401 interceptor with single-flight refresh + retry
 * - Refresh lock (isRefreshing) to prevent concurrent refresh races
 */

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

// ─── Core Request Function ─────────────────────

interface RequestOptions extends RequestInit {
    skipAuth?: boolean;
}

/**
 * Central request dispatcher. Reads the access token from localStorage,
 * injects the Authorization header, and retries once on 401.
 */
export async function request<T>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { skipAuth = false, ...fetchOptions } = options;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...((fetchOptions.headers as Record<string, string>) || {}),
    };

    // Inject token unless explicitly skipped
    if (!skipAuth) {
        const store = getTokenStore();
        if (store?.accessToken) {
            headers["Authorization"] = `Bearer ${store.accessToken}`;
        }
    }

    // Resolve endpoint: if it starts with /api, prepend the backend URL
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
    const resolvedEndpoint = endpoint.startsWith("/api") ? `${backendUrl}${endpoint}` : endpoint;

    const config: RequestInit = { ...fetchOptions, headers };

    let response: Response;
    try {
        response = await fetch(resolvedEndpoint, config);
    } catch {
        throw new ApiError({ message: "Network error occurred", status: 0 });
    }

    // ─── 401 Interceptor ───────────────────────
    if (response.status === 401 && !skipAuth) {
        // If someone else is already refreshing, wait for their result
        if (isRefreshing) {
            const newToken = await waitForRefresh();
            if (newToken) {
                headers["Authorization"] = `Bearer ${newToken}`;
                const retryResponse = await fetch(resolvedEndpoint, { ...fetchOptions, headers });
                if (!retryResponse.ok) {
                    return handleErrorResponse(retryResponse);
                }
                return retryResponse.status === 204
                    ? (null as unknown as T)
                    : retryResponse.json();
            } else {
                // Refresh failed — force logout
                redirectToLogin();
                throw new UnauthorizedError("Session expired. Please log in again.");
            }
        }

        // We are the first caller to hit 401 — attempt refresh
        const refreshed = await refreshAccessToken();
        if (refreshed) {
            const newStore = getTokenStore();
            if (newStore?.accessToken) {
                headers["Authorization"] = `Bearer ${newStore.accessToken}`;
                const retryResponse = await fetch(resolvedEndpoint, { ...fetchOptions, headers });
                if (!retryResponse.ok) {
                    return handleErrorResponse(retryResponse);
                }
                return retryResponse.status === 204
                    ? (null as unknown as T)
                    : retryResponse.json();
            }
        }

        // Refresh failed completely
        redirectToLogin();
        throw new UnauthorizedError("Session expired. Please log in again.");
    }

    if (!response.ok) {
        return handleErrorResponse(response);
    }

    return response.status === 204 ? (null as unknown as T) : response.json();
}

async function handleErrorResponse(response: Response): Promise<never> {
    let errorMsg = "API Request Failed";
    try {
        const errData = await response.json();
        errorMsg = errData.error || errData.message || errorMsg;
    } catch {
        try {
            errorMsg = await response.text();
        } catch {
            // use default
        }
    }
    throw new ApiError({ message: errorMsg, status: response.status });
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
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        const response = await fetch(`${backendUrl}/api/auth/refresh`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken: store.refreshToken }),
        });

        if (!response.ok) {
            onRefreshComplete(null);
            return false;
        }

        const data = await response.json();
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
        const data = await request<{ data: { userId: string; email: string } }>(
            "/api/auth/verify"
        );
        return data.data;
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
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";
        await fetch(`${backendUrl}/api/auth/logout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                refreshToken: store?.refreshToken || "",
                userId: user?.userId || "",
            }),
        });
    } catch {
        // Always succeeds conceptually — clear local state regardless
    }

    clearAll();
}
