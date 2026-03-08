/**
 * useAuthStore — Zustand store for authentication state.
 *
 * Thin reactive wrapper around lib/authService.ts (which handles
 * localStorage persistence, token refresh cron, and OAuth callbacks).
 */

import { create } from "zustand";
import {
    initialize,
    signOut as authSignOut,
    handleOAuthCallback,
    type InitResult,
} from "@/lib/authService";
import type { UserData } from "@/lib/tokenStore";

interface AuthState {
    user: UserData | null;
    isAuthenticated: boolean;
    isLoading: boolean;

    // Actions
    init: () => Promise<InitResult>;
    handleOAuth: (url: string) => Promise<InitResult>;
    signOut: () => Promise<void>;
    refreshAuthState: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    init: async () => {
        set({ isLoading: true });
        try {
            const result = await initialize();
            set({
                user: result.user,
                isAuthenticated: result.authenticated,
            });
            return result;
        } catch {
            set({ user: null, isAuthenticated: false });
            return { authenticated: false, user: null };
        } finally {
            set({ isLoading: false });
        }
    },

    handleOAuth: async (url: string) => {
        set({ isLoading: true });
        try {
            const result = await handleOAuthCallback(url);
            set({
                user: result.user,
                isAuthenticated: result.authenticated,
            });
            return result;
        } catch {
            set({ user: null, isAuthenticated: false });
            return { authenticated: false, user: null };
        } finally {
            set({ isLoading: false });
        }
    },

    signOut: async () => {
        await authSignOut();
        set({ user: null, isAuthenticated: false });
    },

    refreshAuthState: async () => {
        set({ isLoading: true });
        try {
            const result = await initialize();
            set({
                user: result.user,
                isAuthenticated: result.authenticated,
            });
        } finally {
            set({ isLoading: false });
        }
    },
}));
