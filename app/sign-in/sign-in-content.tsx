"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function SignInContent() {
	const searchParams = useSearchParams();
	const [email, setEmail] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

	// Check if dev environment for protocol handling
	const env = searchParams.get("env") === "dev" ? "dev" : undefined;

	const handleGoogleSignIn = async () => {
		setIsLoading(true);
		setMessage(null);

		try {
			const response = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ provider: "google", env }),
			});

			const data = await response.json();

			if (!response.ok) {
				setMessage({ type: "error", text: data.error });
				setIsLoading(false);
				return;
			}

			// Redirect to Google OAuth
			window.location.href = data.url;
		} catch {
			setMessage({ type: "error", text: "Something went wrong. Please try again." });
			setIsLoading(false);
		}
	};

	const handleEmailContinue = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!email) return;

		setIsLoading(true);
		setMessage(null);

		try {
			const response = await fetch("/api/auth", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ provider: "email", email, env }),
			});

			const data = await response.json();

			if (!response.ok) {
				setMessage({ type: "error", text: data.error });
			} else {
				setMessage({ type: "success", text: data.message });
			}
		} catch {
			setMessage({ type: "error", text: "Something went wrong. Please try again." });
		}
		setIsLoading(false);
	};

	return (
		<div className="min-h-screen bg-background flex flex-col">
			{/* Header with Logo */}
			<header className="p-6">
				<Link href="/" className="inline-block">
					<Image
						src="/svgs/web_logo.svg"
						alt="Invook"
						width={0}
						height={0}
						style={{ height: "1.5rem", width: "auto" }}
						className="h-6 w-auto brightness-0 dark:invert"
						priority
					/>
				</Link>
			</header>

			{/* Main Content */}
			<main className="flex-1 flex items-center justify-center px-4 -mt-16">
				<div className="w-full max-w-[400px] space-y-8">
					{/* Welcome Text */}
					<div className="space-y-1 tracking-tight">
						<h1 className="text-2xl font-normal text-foreground">
							Welcome to Invook
						</h1>
						<p className="text-lg text-muted-foreground/60">
							An infinite canvas for your creative mind
						</p>
					</div>

					{/* Message */}
					{message && (
						<div
							className={`p-3 rounded-md text-sm ${
								message.type === "success"
									? "bg-green-500/10 text-green-500 border border-green-500/20"
									: "bg-red-500/10 text-red-500 border border-red-500/20"
							}`}
						>
							{message.text}
						</div>
					)}

					{/* OAuth Buttons */}
					<div className="space-y-3">
						<button
							onClick={handleGoogleSignIn}
							disabled={isLoading}
							className="w-full h-12 flex items-center justify-center gap-3 rounded-md bg-secondary border border-border/40 text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<svg className="w-5 h-5" viewBox="0 0 24 24">
								<path
									fill="#4285F4"
									d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								/>
								<path
									fill="#34A853"
									d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								/>
								<path
									fill="#FBBC05"
									d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								/>
								<path
									fill="#EA4335"
									d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								/>
							</svg>
							<span className="text-[15px]">Continue with Google</span>
						</button>
					</div>

					{/* Email Form */}
					<form onSubmit={handleEmailContinue} className="space-y-4">
						<div className="space-y-2">
							<label
								htmlFor="email"
								className="block text-sm text-muted-foreground/60"
							>
								Email
							</label>
							<input
								id="email"
								type="email"
								placeholder="Your email address"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
								className="w-full h-12 px-4 rounded-md bg-secondary border border-border/40 text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-border transition-colors disabled:opacity-50"
							/>
						</div>
						<button
							type="submit"
							disabled={isLoading || !email}
							className="w-full h-12 flex items-center justify-center rounded-md bg-secondary border border-border/40 text-foreground hover:bg-secondary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							<span className="text-[15px]">{isLoading ? "Loading..." : "Continue"}</span>
						</button>
					</form>

					{/* Sign Up Link */}
					<p className="text-center text-sm text-muted-foreground/60">
						Don&apos;t have an account?{" "}
						<Link
							href="/sign-up"
							className="text-muted-foreground hover:text-foreground transition-colors"
						>
							Sign up
						</Link>
					</p>
				</div>
			</main>

			{/* Footer */}
			<footer className="p-6 text-center">
				<p className="text-sm text-muted-foreground/50">
					<Link
						href="https://invook.notion.site/Terms-of-Use-2917f199308b8085ae78ce56ba9fd0b3"
						className="hover:text-muted-foreground transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						Terms of Service
					</Link>
					<span className="mx-1">and</span>
					<Link
						href="/privacy-policy"
						className="hover:text-muted-foreground transition-colors"
					>
						Privacy Policy
					</Link>
				</p>
			</footer>
		</div>
	);
}
