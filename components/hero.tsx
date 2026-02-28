"use client";

import Link from "next/link";

export function Hero() {
	return (
		<section className="bg-background pt-20 pb-24">
			<div className="container mx-auto max-w-[1400px]">
				<div className="flex flex-col items-start max-w-3xl">
					<h1 className="text-xl sm:text-[24px] md:text-[28px] text-foreground mb-3 max-w-lg text-balance tracking-tighter">
						An infinite canvas for your creative mind.
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground/70 mb-8 max-w-md">
						Bring your ideas to life faster than ever before. Every creative AI tools, one unified process.
					</p>

					<Link
						href="/download"
						className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm"
					>
						Download
					</Link>
				</div>

				<div className="mt-12 md:mt-16 w-full rounded-xl overflow-hidden border shadow-xl">
					<video
						src="https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/web_demo_2.mov"
						autoPlay
						muted
						loop
						playsInline
						className="w-full h-auto block"
					/>
				</div>
			</div>
		</section>
	);
}