"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(^|;)\\s*${name}\\s*=\\s*([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
}

export default function AuthSuccessPage() {
    const router = useRouter();
    const { handleOAuth } = useAuth();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [userEmail, setUserEmail] = useState<string>("");

    useEffect(() => {
        const processAuth = async () => {
            try {
                // Read source from cookie (set before OAuth redirect)
                const source = getCookie("auth_source") ?? "web";
                const isElectron = source === "desktop" || source === "desktop-dev";
                const isDev = source === "desktop-dev";

                const hash = window.location.hash;
                const nextPath = getCookie("redirect_to") ?? "/explore";

                // ─── Electron Flow ──────────────────────
                if (isElectron && hash && hash.length > 1) {
                    const protocol = isDev ? "invook-dev" : "invook";
                    const electronCallbackUrl = `${protocol}://oauth/callback${hash}`;
                    window.location.href = electronCallbackUrl;
                    return;
                }

                // ─── Web App Flow ───────────────────────
                if (hash && hash.length > 1) {
                    const result = await handleOAuth(window.location.href);

                    if (result.authenticated && result.user) {
                        setUserEmail(result.user.email);
                        setStatus("success");
                        setTimeout(() => {
                            router.push(nextPath);
                        }, 1500);
                        return;
                    }
                }

                // No tokens found
                setStatus("error");
            } catch {
                setStatus("error");
            }
        };

        processAuth();
    }, [handleOAuth, router]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="text-center max-w-md w-full space-y-6">
                {status === "loading" && (
                    <>
                        <div className="w-12 h-12 border-4 border-foreground/20 border-t-foreground rounded-full animate-spin mx-auto" />
                        <p className="text-lg text-foreground">Signing you in...</p>
                    </>
                )}

                {status === "success" && (
                    <>
                        <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-lg font-medium text-foreground">Welcome back!</p>
                            {userEmail && (
                                <p className="text-sm text-muted-foreground mt-1">{userEmail}</p>
                            )}
                        </div>
                        <p className="text-sm text-muted-foreground">Redirecting...</p>
                    </>
                )}

                {status === "error" && (
                    <>
                        <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto">
                            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <p className="text-lg font-medium text-foreground">Authentication failed</p>
                        <p className="text-sm text-muted-foreground">No tokens found. Please try signing in again.</p>
                        <button
                            onClick={() => router.push("/sign-in")}
                            className="mt-4 px-6 py-2 rounded-full bg-[#F54E00] text-white font-medium hover:bg-[#F54E00]/90 transition-colors"
                        >
                            Back to Sign In
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
