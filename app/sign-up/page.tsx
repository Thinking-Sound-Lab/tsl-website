import type { Metadata } from "next";
import { Suspense } from "react";
import SignUpContent from "./sign-up-content";

export const metadata: Metadata = {
	title: "Sign Up - Invook",
	description: "Create your Invook account - The AI Creative Workspace",
};

export default function SignUpPage() {
	return (
		<Suspense
			fallback={
				<div className="min-h-screen bg-background flex items-center justify-center">
					<span className="text-muted-foreground">Loading...</span>
				</div>
			}
		>
			<SignUpContent />
		</Suspense>
	);
}
