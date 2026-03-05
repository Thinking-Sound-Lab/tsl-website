"use client";

/**
 * AuthContext — provides { user, isAuthenticated, isLoading } to the app.
 *
 * On mount: calls authService.initialize() to restore session from localStorage.
 * Exposes: signOut(), the auth state, and a re-initialize trigger.
 */

import { createContext, useContext, useEffect, useState, useCallback, type ReactNode } from "react";
import { initialize, signOut as authSignOut, handleOAuthCallback, type InitResult } from "@/lib/authService";
import { createClient } from "@/lib/supabase/client";
import type { UserData } from "@/lib/tokenStore";
import { setTokenStore, setUser as setStoredUser, type TokenStoreData } from "@/lib/tokenStore";

interface AuthContextValue {
    user: UserData | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    signOut: () => Promise<void>;
    handleOAuth: (url: string) => Promise<InitResult>;
    refreshAuthState: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize auth on mount and listen for dynamic URL hash changes
    useEffect(() => {
        let mounted = true;

        async function processHashOrInit() {
            try {
                let result: InitResult;

                // If there's an access token in the URL hash, process it first.
                // This allows any page in the app to act as an OAuth callback page.
                if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
                    result = await handleOAuthCallback(window.location.href);
                    // Clean the hash from the URL so it looks nice and doesn't trigger again
                    window.history.replaceState(null, "", window.location.pathname + window.location.search);
                } else {
                    // Try localStorage-based session first
                    result = await initialize();

                    // If localStorage had nothing, check for a Supabase cookie-based session
                    // (set by /auth/callback after Magic Link PKCE code exchange)
                    if (!result.authenticated) {
                        try {
                            const supabase = createClient();
                            const { data: { session } } = await supabase.auth.getSession();

                            if (session?.access_token && session?.refresh_token) {
                                // Sync the cookie-based session into localStorage
                                const newStore: TokenStoreData = {
                                    accessToken: session.access_token,
                                    refreshToken: session.refresh_token,
                                    expiresIn: session.expires_in || 3600,
                                    tokenExpiresAt: Date.now() + (session.expires_in || 3600) * 1000,
                                };
                                setTokenStore(newStore);

                                const userData = {
                                    userId: session.user.id,
                                    email: session.user.email || "user@example.com",
                                };
                                setStoredUser(userData);

                                result = { authenticated: true, user: userData };
                            }
                        } catch (e) {
                            console.error("Supabase session check failed:", e);
                        }
                    }
                }

                if (mounted) {
                    setUser(result.user);
                    setIsAuthenticated(result.authenticated);
                }
            } catch {
                if (mounted) {
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } finally {
                if (mounted) {
                    setIsLoading(false);
                }
            }
        }

        // 1. Run immediately on component mount
        processHashOrInit();

        // 2. Also listen for any dynamic URL hash changes (e.g. user pasting the mock token)
        const handleHashChange = () => {
            if (window.location.hash.includes("access_token=")) {
                setIsLoading(true);
                processHashOrInit();
            }
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            mounted = false;
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    const handleSignOut = useCallback(async () => {
        await authSignOut();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    const handleOAuth = useCallback(async (url: string) => {
        const result = await handleOAuthCallback(url);
        setUser(result.user);
        setIsAuthenticated(result.authenticated);
        return result;
    }, []);

    const refreshAuthState = useCallback(async () => {
        setIsLoading(true);
        try {
            const result = await initialize();
            setUser(result.user);
            setIsAuthenticated(result.authenticated);
        } finally {
            setIsLoading(false);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                signOut: handleSignOut,
                handleOAuth,
                refreshAuthState,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
