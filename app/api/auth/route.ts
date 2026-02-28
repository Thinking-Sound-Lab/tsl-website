import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const { provider, email } = body;

		const supabase = await createClient();
		const origin = request.headers.get("origin") || "http://localhost:3000";
		const redirectTo = `${origin}/download`;

		if (provider === "google") {
			const { data, error } = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: {
					redirectTo,
					skipBrowserRedirect: true,
				},
			});

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}

			return NextResponse.json({ url: data.url });
		}

		if (provider === "email") {
			if (!email) {
				return NextResponse.json({ error: "Email is required" }, { status: 400 });
			}

			const { error } = await supabase.auth.signInWithOtp({
				email,
				options: {
					emailRedirectTo: redirectTo,
				},
			});

			if (error) {
				return NextResponse.json({ error: error.message }, { status: 400 });
			}

			return NextResponse.json({ success: true, message: "Check your email for the magic link!" });
		}

		return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
	} catch (error) {
		console.error("Auth error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
