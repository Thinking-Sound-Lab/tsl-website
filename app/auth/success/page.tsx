"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";


export default function AuthSuccessPage() {
    const router = useRouter();
    const { handleOAuth } = useAuthStore();
    const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
    const [userEmail, setUserEmail] = useState<string>("");
    const [isElectronFlow, setIsElectronFlow] = useState(false);
    const [electronUrl, setElectronUrl] = useState<string>("");

    useEffect(() => {
        const processAuth = async () => {
            try {
                // Read from URL parameters
                const searchParams = new URLSearchParams(window.location.search);
                const source = searchParams.get("source") ?? "web";
                const nextPath = searchParams.get("redirect_to") ?? "/explore";

                const isElectron = source === "desktop" || source === "desktop-dev";
                const isDev = source === "desktop-dev";
                setIsElectronFlow(isElectron);

                const hash = window.location.hash;

                // ─── Process OAuth for all flows ──────────────────────
                if (hash && hash.length > 1) {
                    const result = await handleOAuth(window.location.href);

                    if (result.authenticated && result.user) {
                        setUserEmail(result.user.email);
                        setStatus("success");

                        if (isElectron) {
                            const protocol = isDev ? "invook-dev" : "invook";
                            const electronCallbackUrl = `${protocol}://oauth/callback${hash}`;
                            setElectronUrl(electronCallbackUrl);
                            
                            // Automatically trigger the deep link
                            window.location.href = electronCallbackUrl;
                        } else {
                            setTimeout(() => {
                                router.push(nextPath);
                            }, 1500);
                        }
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

    const handleOpenApp = () => {
        if (electronUrl) {
            window.location.href = electronUrl;
        }
    };

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
                        
                        {isElectronFlow ? (
                            <div className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    You should be automatically redirected to the app. 
                                    If not, please click the button below.
                                </p>
                                <button
                                    onClick={handleOpenApp}
                                    className="px-8 py-3 rounded-full bg-[#F54E00] text-white font-medium hover:bg-[#F54E00]/90 transition-colors shadow-lg"
                                >
                                    Open Invook App
                                </button>
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">Redirecting...</p>
                        )}
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
