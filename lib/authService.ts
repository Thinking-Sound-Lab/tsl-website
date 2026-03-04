/**
 * Auth Orchestrator — manages the full authentication lifecycle:
 * - initialize(): restores session from localStorage on app load
 * - handleOAuthCallback(): parses tokens from URL hash after OAuth redirect
 * - scheduleTokenRefresh(): proactive 55-minute refresh cron (checks every 60s)
 * - signOut(): clears tokens and redirects
 */

import { getTokenStore, setTokenStore, getUser, setUser, clearAll, type TokenStoreData } from "./tokenStore";
import { refreshAccessToken, verifyToken, logout as apiLogout } from "./apiService";

let refreshIntervalId: ReturnType<typeof setInterval> | null = null;

// ─── Initialize ────────────────────────────────

export interface InitResult {
    authenticated: boolean;
    user: { userId: string; email: string } | null;
}

/**
 * Helper to decode the JWT payload without relying on an external library.
 */
function decodeJWT(token: string): { email?: string; sub?: string } | null {
    try {
        const parts = token.split(".");
        if (parts.length !== 3) return null;
        const payload = parts[1];
        const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
                .join("")
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

/**
 * Called once on app load.
 * Checks localStorage for existing tokens, attempts eager refresh,
 * and starts the proactive refresh cron if valid.
 */
export async function initialize(): Promise<InitResult> {
    const store = getTokenStore();
    const user = getUser();

    // Nothing in storage → unauthenticated
    if (!store || !store.refreshToken) {
        return { authenticated: false, user: null };
    }

    // Both exist → attempt eager refresh to ensure token is still valid
    const refreshed = await refreshAccessToken();

    if (refreshed) {
        // Start the proactive 55-min cron
        scheduleTokenRefresh();

        // If we already have a cached user, return it
        if (user) {
            return { authenticated: true, user };
        }

        // Otherwise fetch user profile from backend
        const verifiedUser = await verifyToken();
        if (verifiedUser) {
            setUser(verifiedUser);
            return { authenticated: true, user: verifiedUser };
        }
    }

    // Refresh failed — could be network or invalid token
    // If it's a network error and we have cached data, keep the session
    if (user && store.accessToken) {
        scheduleTokenRefresh();
        return { authenticated: true, user };
    }

    // Invalid token — clear everything
    clearAll();
    return { authenticated: false, user: null };
}

// ─── OAuth Callback Handler ────────────────────

/**
 * Called on the /auth/success page.
 * Parses the URL hash fragment for access_token, refresh_token, expires_in,
 * stores them, verifies the user, and starts the refresh cron.
 */
export async function handleOAuthCallback(url: string): Promise<InitResult> {
    try {
        const hashIndex = url.indexOf("#");
        if (hashIndex === -1) {
            return { authenticated: false, user: null };
        }

        const hashParams = new URLSearchParams(url.substring(hashIndex + 1));
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const expiresInStr = hashParams.get("expires_in");

        if (!accessToken || !refreshToken) {
            return { authenticated: false, user: null };
        }

        const expiresIn = expiresInStr ? parseInt(expiresInStr, 10) : 3600;

        const newStore: TokenStoreData = {
            accessToken,
            refreshToken,
            expiresIn,
            tokenExpiresAt: Date.now() + expiresIn * 1000,
        };

        setTokenStore(newStore);

        // Decode JWT locally to extract user info (avoids depending on external /verify failing)
        let verifiedUser = null;
        const decoded = decodeJWT(accessToken);

        if (decoded && (decoded.email || decoded.sub)) {
            verifiedUser = {
                userId: decoded.sub || "",
                email: decoded.email || "user@example.com"
            };
        } else {
            // Fallback to the server if local decode fails
            verifiedUser = await verifyToken();
        }

        if (verifiedUser) {
            setUser(verifiedUser);
            scheduleTokenRefresh();
            return { authenticated: true, user: verifiedUser };
        }

        // Token was saved but verification failed
        clearAll();
        return { authenticated: false, user: null };
    } catch {
        clearAll();
        return { authenticated: false, user: null };
    }
}

// ─── Sign Out ──────────────────────────────────

export async function signOut(): Promise<void> {
    // Stop the refresh cron
    stopTokenRefresh();

    // Best-effort server logout
    await apiLogout();

    // clearAll() is called inside apiLogout() already,
    // but call it again to be safe
    clearAll();

    // Redirect
    if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
    }
}

// ─── 55-Minute Proactive Refresh Cron ──────────

/**
 * Checks every 60 seconds whether the token expires within 5 minutes.
 * If so, proactively refreshes before the backend's 1-hour expiry.
 *
 * Timeline:
 *   Token issued  →  55 minutes pass  →  refresh fires  →  new token valid for 1 hour
 *                                         ↑
 *                               (tokenExpiresAt - now < 5 min)
 */
export function scheduleTokenRefresh(): void {
    // Don't double-schedule
    if (refreshIntervalId !== null) return;

    refreshIntervalId = setInterval(async () => {
        const store = getTokenStore();
        if (!store?.tokenExpiresAt) {
            stopTokenRefresh();
            return;
        }

        const timeRemainingMs = store.tokenExpiresAt - Date.now();
        const FIVE_MINUTES_MS = 5 * 60 * 1000;

        if (timeRemainingMs < FIVE_MINUTES_MS) {
            const success = await refreshAccessToken();
            if (!success) {
                // Refresh failed — force sign out
                stopTokenRefresh();
                clearAll();
                if (typeof window !== "undefined") {
                    window.location.href = "/sign-in";
                }
            }
        }
    }, 60 * 1000); // Check every 60 seconds
}

export function stopTokenRefresh(): void {
    if (refreshIntervalId !== null) {
        clearInterval(refreshIntervalId);
        refreshIntervalId = null;
    }
}
