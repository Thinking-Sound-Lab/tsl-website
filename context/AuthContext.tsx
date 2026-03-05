"use client";

/**
 * AuthContext — provides { user, isAuthenticated, isLoading } to the app.
 *
 * Now powered by the Zustand useAuthStore internally.
 * The Context + useAuth() hook remain for backward compatibility.
 */

import { createContext, useContext, useEffect, type ReactNode } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import type { UserData } from "@/lib/tokenStore";
import type { InitResult } from "@/lib/authService";

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
    const user = useAuthStore((s) => s.user);
    const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
    const isLoading = useAuthStore((s) => s.isLoading);
    const init = useAuthStore((s) => s.init);
    const handleOAuth = useAuthStore((s) => s.handleOAuth);
    const signOut = useAuthStore((s) => s.signOut);
    const refreshAuthState = useAuthStore((s) => s.refreshAuthState);

    // Initialize auth on mount and listen for dynamic URL hash changes
    useEffect(() => {
        let mounted = true;

        async function processHashOrInit() {
            if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
                await handleOAuth(window.location.href);
                window.history.replaceState(null, "", window.location.pathname + window.location.search);
            } else {
                await init();
            }
        }

        if (mounted) processHashOrInit();

        const handleHashChange = () => {
            if (window.location.hash.includes("access_token=")) {
                processHashOrInit();
            }
        };
        window.addEventListener("hashchange", handleHashChange);

        return () => {
            mounted = false;
            window.removeEventListener("hashchange", handleHashChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                signOut,
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
