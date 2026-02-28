import type { Metadata } from "next";
import { Suspense } from "react";
import SignInContent from "./sign-in-content";

export const metadata: Metadata = {
	title: "Sign In - Invook",
	description: "Sign in to Invook - The AI Creative Workspace",
};

export default function SignInPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-background flex items-center justify-center">
					<span className="text-muted-foreground">Loading...</span>
				</div>
			}
		>
			<SignInContent />
		</Suspense>
	);
}
