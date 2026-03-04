/**
 * Token Storage — SSR-safe localStorage wrapper.
 * Mirrors the Electron app's cache.service.ts architecture.
 *
 * Keys:
 *   "tokenStore" → { accessToken, refreshToken, tokenExpiresAt, expiresIn }
 *   "user"       → { userId, email }
 */

export interface TokenStoreData {
    accessToken: string;
    refreshToken: string;
    tokenExpiresAt: number; // Unix timestamp (ms)
    expiresIn: number;      // seconds
}

export interface UserData {
    userId: string;
    email: string;
}

const STORAGE_KEY_TOKENS = "tokenStore";
const STORAGE_KEY_USER = "user";

function isBrowser(): boolean {
    return typeof window !== "undefined";
}

export function getTokenStore(): TokenStoreData | null {
    if (!isBrowser()) return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY_TOKENS);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setTokenStore(store: TokenStoreData | null): void {
    if (!isBrowser()) return;
    if (store === null) {
        localStorage.removeItem(STORAGE_KEY_TOKENS);
    } else {
        localStorage.setItem(STORAGE_KEY_TOKENS, JSON.stringify(store));
    }
}

export function getUser(): UserData | null {
    if (!isBrowser()) return null;
    try {
        const raw = localStorage.getItem(STORAGE_KEY_USER);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

export function setUser(user: UserData | null): void {
    if (!isBrowser()) return;
    if (user === null) {
        localStorage.removeItem(STORAGE_KEY_USER);
    } else {
        localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(user));
    }
}

export function clearAll(): void {
    if (!isBrowser()) return;
    localStorage.removeItem(STORAGE_KEY_TOKENS);
    localStorage.removeItem(STORAGE_KEY_USER);
}
