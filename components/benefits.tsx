"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BenefitCardProps {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  linkText: string;
  linkUrl: string;
  layout: "left" | "right";
}

function BenefitCard({
  title,
  description,
  image,
  imageAlt,
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

        {/* Image Side */}
        <div className="flex-1 w-full">
           <div className="relative rounded-sm overflow-hidden bg-secondary aspect-square w-full border border-border/50">
            <Image
              src={image}
              alt={imageAlt}
              width={800}
              height={600}
              className="w-full h-full object-fit"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Benefits() {
  const benefits: BenefitCardProps[] = [
    {
      title: "All your work in one place",
      description:
        "Save all of your ideas, files, media, and links. Powerful search makes finding anything instant.",
      image: "/images/hero.png",
      imageAlt: "Unified Drive Interface",
      linkText: "Learn about Drive",
      linkUrl: "/drive",
      layout: "right",
    },
    {
      title: "Find any video, images or files",
      description:
        "Instantly just by describing and not keyword.",
      image: "/images/hero.png",
      imageAlt: "Universal Search Interface",
      linkText: "Learn about Search",
      linkUrl: "/search",
      layout: "left",
    },
    {
      title: "Spatial AI for deep work",
      description:
        "A single workspace to organize, review, and work with your content. Visually map out your research.",
      image: "/images/hero.png",
      imageAlt: "Research Canvas Interface",
      linkText: "Learn about Canvas",
      linkUrl: "/canvas",
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