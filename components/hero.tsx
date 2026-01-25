"use client";

import Image from "next/image";
import Link from "next/link";

export function Hero() {
  const getDownloadButtonText = () => {
    return "Join Waitlist";
  };

  return (
    <section className="bg-background pt-20 pb-24">
      <div className="container mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start max-w-3xl">
          <h1 className="text-xl sm:text-[24px] md:text-[28px] text-foreground mb-8 max-w-lg text-balance tracking-tighter">
            Store, connect, and explore your ideas and research in one focused, distraction-free space.
          </h1>

          <Link
            href="/waitlist"
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm"
          >
            {getDownloadButtonText()}
          </Link>
        </div>
        
        <div className="mt-12 md:mt-16 w-full rounded-lg overflow-hidden border bg-muted shadow-xl relative aspect-[16/10] md:aspect-video">
           <div className="relative w-full h-full flex items-center justify-center p-4 md:p-8">
            <Image
              src="https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/benefits-bg.png"
              alt="Background"
              fill
              className="object-cover"
              sizes="100vw"
            />
            <div className="relative z-10 w-[85%] aspect-video rounded-lg overflow-hidden">
              <video
                src="https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/hero23.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
          </div>
        </div>
      </div>
    </section>
  );
}