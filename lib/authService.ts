/**
 * authService.ts — Client-Side Auth Orchestrator
 *
 * Manages high-level auth flows:
 * - App Initialization (Check localStorage -> Verify Token)
 * - OAuth Callback (Parse URL -> Save to localStorage)
 */

import { getTokenStore, setTokenStore, setUser, clearAll, type TokenStoreData } from "./tokenStore";
import { verifyToken, logout as apiLogout } from "./apiService";

// ─── Initialize ────────────────────────────────

export interface InitResult {
    authenticated: boolean;
    user: { userId: string; email: string } | null;
}

/**
 * Called once on app load.
 * Checks localStorage for tokens, validates them with backend (auto-refresh if needed).
 */
export async function initialize(): Promise<InitResult> {
    const store = getTokenStore();

    // 1. No tokens? Not authenticated.
    if (!store?.accessToken) {
        clearAll();
        return { authenticated: false, user: null };
    }

    // 2. We have tokens. Verify them.
    // verifyToken() uses the apiService which handles 401->Refresh automatically.
    const verifiedUser = await verifyToken();

    if (verifiedUser) {
        // Update user profile in cache
        setUser(verifiedUser);
        return { authenticated: true, user: verifiedUser };
    }

    // 3. Verification failed (and refresh failed). Clear session.
    clearAll();
    return { authenticated: false, user: null };
}

// ─── OAuth Callback Handler ────────────────────

/**
 * Called on the /auth/success page.
 * Parses the URL hash fragment for tokens, saves to localStorage.
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

        // Save to LocalStorage
        const newStore: TokenStoreData = {
            accessToken,
            refreshToken,
            expiresIn,
            tokenExpiresAt: Date.now() + expiresIn * 1000,
        };
        setTokenStore(newStore);

        // Verify immediately to get user details
        const verifiedUser = await verifyToken();

        if (verifiedUser) {
            setUser(verifiedUser);
            return { authenticated: true, user: verifiedUser };
        }

        return { authenticated: false, user: null };
    } catch (e) {
        console.error("Auth callback failed", e);
        return { authenticated: false, user: null };
    }
}

// ─── Sign Out ──────────────────────────────────

export async function signOut(): Promise<void> {
    await apiLogout();
}
