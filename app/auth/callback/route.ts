import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * GET /auth/callback?code=...&next=/explore
 *
 * Supabase Magic Link (PKCE) redirects here with a `code` query param.
 * We exchange it for a session (sets auth cookies automatically via @supabase/ssr),
 * then redirect the user to their intended destination.
 */
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") || "/explore";
    const origin = request.headers.get("origin") || new URL(request.url).origin;

    if (!code) {
        // No code provided — redirect to sign-in with an error
        return NextResponse.redirect(
            `${origin}/sign-in?error=${encodeURIComponent("No authentication code provided.")}`
        );
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("Code exchange error:", error.message);
        return NextResponse.redirect(
            `${origin}/sign-in?error=${encodeURIComponent(error.message)}`
        );
    }

    // Success — session cookies are set by @supabase/ssr.
    // Redirect to the intended destination.
    return NextResponse.redirect(`${origin}${next}`);
}
