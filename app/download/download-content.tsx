"use client";

import Image from "next/image";
import Link from "next/link";

export default function DownloadContent() {
	const macDownloadUrl = process.env.NEXT_PUBLIC_MAC_DOWNLOAD_URL || "#";
	const windowsDownloadUrl = process.env.NEXT_PUBLIC_WINDOWS_DOWNLOAD_URL || "#";

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
				<div className="w-full max-w-[500px] space-y-10">
					{/* Header Text */}
					<div className="space-y-2 tracking-tight">
						<h1 className="text-3xl md:text-4xl font-normal text-foreground">
							Download Invook
						</h1>
						<p className="text-lg text-muted-foreground/60">
							Available for macOS and Windows
						</p>
					</div>

					{/* Download Options */}
					<div className="space-y-4">
						{/* macOS */}
						<a
							href={macDownloadUrl}
							className="group flex items-center justify-between w-full p-5 rounded-lg bg-secondary border border-border/40 hover:bg-secondary/80 hover:border-border/60 transition-all"
						>
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border/40">
									<svg
										className="w-7 h-7 text-foreground"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
									</svg>
								</div>
								<div>
									<p className="text-[15px] font-medium text-foreground">macOS</p>
									<p className="text-sm text-muted-foreground/60">Apple Silicon & Intel</p>
								</div>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
								<span className="text-sm">Download</span>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
							</div>
						</a>

						{/* Windows */}
						<a
							href={windowsDownloadUrl}
							className="group flex items-center justify-between w-full p-5 rounded-lg bg-secondary border border-border/40 hover:bg-secondary/80 hover:border-border/60 transition-all"
						>
							<div className="flex items-center gap-4">
								<div className="w-12 h-12 flex items-center justify-center rounded-lg bg-background border border-border/40">
									<svg
										className="w-7 h-7 text-foreground"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M3 12V6.75l6-1.32v6.48L3 12zm17-9v8.75l-10 .15V5.21L20 3zM3 13l6 .09v6.81l-6-1.15V13zm17 .25V22l-10-1.91V13.1l10 .15z" />
									</svg>
								</div>
								<div>
									<p className="text-[15px] font-medium text-foreground">Windows</p>
									<p className="text-sm text-muted-foreground/60">Windows 10 or later</p>
								</div>
							</div>
							<div className="flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors">
								<span className="text-sm">Download</span>
								<svg
									className="w-5 h-5"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
									/>
								</svg>
							</div>
						</a>
					</div>

					{/* Footer Note */}
					<p className="text-center text-sm text-muted-foreground/50">
						By downloading, you agree to our{" "}
						<Link
							href="https://invook.notion.site/Terms-of-Use-2917f199308b8085ae78ce56ba9fd0b3"
							className="hover:text-muted-foreground transition-colors underline"
							target="_blank"
							rel="noopener noreferrer"
						>
							Terms of Service
						</Link>
					</p>
				</div>
			</main>
		</div>
	);
}
