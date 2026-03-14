"use client";

import Link from "next/link";
import Image from "next/image";

export function Hero() {
	return (
		<section className="bg-background pt-20 pb-24">
			<div className="container mx-auto max-w-[1400px]">
				<div className="flex flex-col items-start max-w-3xl">
					<h1 className="text-xl sm:text-[24px] md:text-[28px] text-foreground mb-3 max-w-lg text-balance tracking-tighter">
						An infinite canvas for your creative mind.
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground/70 mb-8 max-w-md">
						Bring your ideas to life faster than ever before. Every creative AI tool, one unified process.
					</p>

					<Link
						href="/download"
						className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm"
					>
						Download
					</Link>
				</div>

				<div className="mt-12 md:mt-20 w-full rounded-2xl overflow-hidden border shadow-2xl relative group">
					<div 
						className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40"
						style={{ backgroundImage: "url('/images/benefits-bg.png')" }}
					/>
					<div className="relative p-8 md:p-12 lg:p-16">
						<Image
							src="https://res.cloudinary.com/disoisftp/image/upload/v1773466058/Screenshot_2026-03-14_at_10.46.34_AM_c0nkuj.png"
							alt="Hero Demo"
							width={1400}
							height={800}
							className="w-full h-auto block rounded-lg shadow-2xl border border-white/10"
						/>
					</div>
				</div>
			</div>
		</section>
	);
}