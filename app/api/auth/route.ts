import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { provider, email, isSignUp, env, redirectToPath = "/explore" } = body;
        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "";

        const source = env === "dev" ? "desktop-dev" : env === "electron" ? "desktop" : "web";

        if (provider === "google") {
            const origin = request.headers.get("origin") || "http://localhost:3000";
            const googleRedirectUrl = `${origin}/auth/success?source=web&redirect_to=${encodeURIComponent(redirectToPath)}`;

            console.log("Initiating Google OAuth with redirectTo:", googleRedirectUrl);

            const response = await fetch(`${backendUrl}/api/auth/oauth/google`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ redirectTo: googleRedirectUrl }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return NextResponse.json(
                    { error: data.error || "Google OAuth failed" },
                    { status: 400 }
                );
            }

            const oauthUrl = data.data?.url;

            return NextResponse.json({ url: oauthUrl });
        }

        if (provider === "email") {
            if (!email) {
                return NextResponse.json({ error: "Email is required" }, { status: 400 });
            }

            const origin = request.headers.get("origin") || "http://localhost:3000";
            const baseRedirectUrl = `${origin}/auth/success?source=${source}&redirect_to=${encodeURIComponent(redirectToPath)}`;

            const response = await fetch(`${backendUrl}/api/auth/magic-link`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    isSignUp: !!isSignUp,
                    redirectTo: baseRedirectUrl,
                }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                return NextResponse.json(
                    { error: data.error || "Failed to send magic link" },
                    { status: 400 }
                );
            }

            return NextResponse.json({
                success: true,
                message: data.message || "Check your email for the magic link!",
            });
        }

        return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
    } catch (error) {
        console.error("Auth error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
