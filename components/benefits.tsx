"use client";

import { useRef } from "react";
import Image from "next/image";
import Lottie from "lottie-react";


import driveImage from "@/public/assets/benefit-drive.webp";
import canvasImage from "@/public/assets/benefit-canvas.webp";
import voiceImage from "@/public/assets/benefit-voice.webp";

/**
 * Reusable Lottie Animation Component
 * Usage:
 * 1. Add your .json file to /public/assets/
 * 2. Import it at the top: import myAnimation from "@/public/assets/my_animation.json";
 * 3. Use in mockup: mockup: <LottieAnimation animationData={myAnimation} />
 *
 * Features:
 * - Plays animation once
 * - Waits 10 seconds after completion
 * - Replays automatically
 * - Loops indefinitely with 10s delay between plays
 */
export function LottieAnimation({
  animationData,
  className,
}: {
  animationData: object;
  className?: string;
}) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);

  const handleComplete = () => {
    setTimeout(() => {
      if (lottieRef.current) {
        lottieRef.current.goToAndPlay(0);
      }
    }, 3000);
  };

  return (
    <div className={`mt-6 ${className || ""}`}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        onComplete={handleComplete}
        className="w-full h-auto"
        style={{ maxWidth: "100%", height: "auto" }}
      />
    </div>
  );
}

export function Benefits() {
  const benefits = [
    {
      tag: "CONTENT HUB",
      title: "Unified Drive",
      description:
        "Save all of your ideas, files, media, and links in one place.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src={driveImage}
            alt="Unified Drive"
            className="w-full h-auto"
            priority
          />
        </div>
      ),
    },
    {
      tag: "RESEARCH CANVAS",
      title: "Spatial AI For Content & Research",
      description:
        "A single workspace to organize, review, and work with your content and research.",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src={canvasImage}
            alt="Research Canvas"
            className="w-full h-auto"
          />
        </div>
      ),
    },
    {
      tag: "VOICE TO TEXT",
      title: "An AI driven dictation",
      description:
        "Transforms spoken language into accurate, structured text using AI",
      arrow: (
        <div className="absolute top-4 right-4 w-8 h-8 bg-emerald-600 flex items-center justify-center">
          <svg
            className="w-4 h-4 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      ),
      mockup: (
        <div className="mt-6 overflow-hidden rounded-xl">
          <Image
            src={voiceImage}
            alt="Voice to Text"
            className="w-full h-auto"
          />
        </div>
      ),
    },
  ];

  return (
    <section>
      <div className="p-4 sm:p-6 md:p-8 lg:p-16">
        {/* Heading Section */}
        <div className="text-center mb-16 sm:mb-20 px-4 sm:px-0">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 tracking-tight mb-4">
            Your Unified Knowledge Space
          </h2>
          <p className="text-base font-mono text-gray-700/80 max-w-2xl mx-auto text-center leading-relaxed">
            By organizing your ideas, files, and research into a single Drive and Canvas,
            Invook helps you work faster, think clearly, and stay focused on
            what matters most.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-6 lg:gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative border bg-white/50 transition-colors duration-200 p-6 sm:p-8"
              style={{ borderColor: "#b0b0b0" }}
            >
              {/* Tag */}
              <div className="text-xs font-mono text-emerald-600 font-medium mb-2 tracking-wide">
                [{benefit.tag}]
              </div>

              {/* Arrow */}
              {benefit.arrow}

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 leading-tight">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mb-4 font-mono">
                {benefit.description}
              </p>

              {/* Mockup */}
              {benefit.mockup}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}