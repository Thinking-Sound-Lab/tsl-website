"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";

/**
 * AuthInitializer component handles the global authentication initialization logic.
 * It calls the init() method on mount and listens for dynamic URL hash changes
 * (e.g., from OAuth callbacks).
 * 
 * This replaces the logic previously found in AuthProvider.
 */
export function AuthInitializer() {
    const init = useAuthStore((s) => s.init);
    const handleOAuth = useAuthStore((s) => s.handleOAuth);

    useEffect(() => {
        let mounted = true;

        async function processHashOrInit() {
            if (typeof window !== "undefined" && window.location.hash.includes("access_token=")) {
                await handleOAuth(window.location.href);
                // Clean up the URL hash after processing
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
    }, [handleOAuth, init]);

    return null; // This component doesn't render anything
}
