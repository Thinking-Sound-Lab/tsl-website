"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  video?: string;
  linkText: string;
  linkUrl: string;
  layout: "left" | "right";
}

function BenefitCard({
  title,
  description,
  image,
  imageAlt,
  video: videoSrc,
  linkText,
  linkUrl,
  layout,
}: BenefitCardProps) {
  return (
    <div className="bg-secondary w-full py-4 md:py-8 rounded-sm border border-border/50">
      <div
        className={cn(
          "container mx-auto max-w-[1400px] flex flex-col gap-8 lg:gap-12 items-start lg:items-center px-4 md:px-8",
          layout === "left" ? "lg:flex-row-reverse" : "lg:flex-row"
        )}
      >
        {/* Content Side */}
        <div className="flex-1 flex flex-col items-start gap-2 lg:gap-4 max-w-xl">
          <div className="space-y-2 lg:space-y-2">
            <h3 className="text-[15px] md:text-[18px] lg:text-[20px] text-foreground tracking-tight leading-[1.1]">
              {title}
            </h3>
            <p className="text-[15px] md:text-[18px] lg:text-[20px] font-normal text-muted-foreground tracking-tight leading-[1.4]">
              {description}
            </p>
          </div>
          <Link
            href={linkUrl}
            className="inline-flex items-center text-[15px] md:text-[16px] text-[#FF4500] hover:text-[#FF4500]/90 transition-colors group"
          >
            {linkText}
            <svg
              className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>

        {/* Image/Video Side */}
        <div className="flex-1 w-full">
           <div className="relative rounded-sm overflow-hidden bg-secondary aspect-square w-full border border-border/50">
            {videoSrc ? (
              <div className="relative w-full h-full flex items-center justify-center p-4 md:p-6">
                 <Image
                  src="https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/benefits-bg.png"
                  alt="Background"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="relative z-10 w-full aspect-video rounded-lg overflow-hidden">
                  {videoSrc.endsWith(".mp4") || videoSrc.endsWith(".mov") ? (
                    <video
                      src={videoSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Image
                      src={videoSrc}
                      alt={imageAlt}
                      fill
                      className="w-full h-full object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-20" />
              </div>
            ) : (
              <Image
                src={image}
                alt={imageAlt}
                width={800}
                height={600}
                className="w-full h-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Benefits() {
  const benefits: BenefitCardProps[] = [
    {
      title: "A better drive for your creative mind",
      description:
        "Upload PDFs, YouTube links, or social posts. Everything is automatically transcribed, auto-tagged, and organized by AI. No more folder shuffling.",
      image: "/images/Drive.png",
      video: "https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/drive2.png",
      imageAlt: "Intelligent Drive Interface",
      linkText: "Learn about Drive",
      linkUrl: "/waitlist",
      layout: "right",
    },
    {
      title: "Find anything, exactly as you remember it",
      description:
        "Search for \"pink sweater\" or \"cake cutting\" to find the exact video frame, audio clip, or document snippet. Invook never forgets.",
      image: "/images/Search.png",
      video: "https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/Search2.mp4",
      imageAlt: "Universal Search Interface",
      linkText: "Learn about Search",
      linkUrl: "/waitlist",
      layout: "left",
    },
    {
      title: "One intelligent canvas for deep work",
      description:
        "Break free from tabs. Visually map out topics, connect assets from your drive, and run multiple AI chats in a single view for true creative flow.",
      image: "/images/Canvas.png",
      video: "https://q3kusohadpqcfxz4.public.blob.vercel-storage.com/benefits/canvas2.png",
      imageAlt: "Spatial Canvas Interface",
      linkText: "Learn about Canvas",
      linkUrl: "/waitlist",
      layout: "right",
    },
  ];

  return (
    <section>
      <div className="flex flex-col gap-12 md:gap-20">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
    </section>
  );
}