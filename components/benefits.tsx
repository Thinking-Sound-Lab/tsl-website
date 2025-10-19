"use client";

import { useRef } from "react";
import Lottie from "lottie-react";
// Import your Lottie JSON files here
import translationAnimation from "@/public/assets/translation.json";
import autoEditAnimation from "@/public/assets/auto_edit.json";
// Add more imports as needed:
import commandModeAnimation from "@/public/assets/command.json";
import vocabularyAnimation from "@/public/assets/vocabulory.json";

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
      tag: "100+ LANGUAGES",
      title: "Translation",
      description:
        "Convert voice to text in multiple languages with advanced AI technology for seamless communication.",
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
      mockup: <LottieAnimation animationData={translationAnimation} />,
    },
    {
      tag: "SMART EDITING",
      title: "Auto Edits",
      description:
        "Speak naturally and Invook transcribes and edits your voice, instantly. Rambled thoughts become clear, perfectly formatted text, without the filler words or typos.",
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
      mockup: <LottieAnimation animationData={autoEditAnimation} />,
    },
    {
      tag: "COMMAND MODE",
      title: "Command Mode",
      description:
        "Dictation that answers or transforms instead of transcribing. Ask questions and get instant responses through voice commands.",
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
      mockup: <LottieAnimation animationData={commandModeAnimation} />,
    },
    {
      tag: "PERSONALIZATION",
      title: "Vocabulary & Dictionary",
      description:
        "Train the AI to understand your specific terminology, jargon, and personal speaking patterns. Create custom key-value mappings that expand shortcuts into full content like URLs, addresses, or templates.",
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
      mockup: <LottieAnimation animationData={vocabularyAnimation} />,
    },
  ];

  return (
    <section>
      <div className="p-4 sm:p-6 md:p-8 lg:p-16">
        {/* Heading Section */}
        <div className="text-left mb-12 lg:mb-16 mt-8 lg:mt-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-700 tracking-tight mb-4">
            Your Intelligent Partner
          </h2>
          <p className="text-base font-mono text-gray-700/80 max-w-2xl leading-relaxed">
            By understanding your voice and what you&apos;re trying to achieve,
            Invook become your intelligent partner helping you work faster,
            think clearer, and accomplish what matters most.
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
