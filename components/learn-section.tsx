"use client";

import { useEffect, useRef, useState } from "react";
import { KeyboardKey } from "@/components/keyboard-key";
import { LottieAnimation } from "@/components/benefits";
import translationAnimation from "@/public/assets/translation.json";
import commandAnimation from "@/public/assets/command.json";
import askaiAnimation from "@/public/assets/askai.json";

const features = [
  {
    id: "dictation",
    title: "Dictation",
    animation: translationAnimation,
    bgColor: "bg-blue-400/30",
    borderColor: "border-blue-400/60",
    textColor: "text-blue-700",
    shortcuts: {
      mac: ["Fn"],
      windows: ["Ctrl", "Window key"],
    },
  },
  {
    id: "command",
    title: "Command",
    animation: commandAnimation,
    bgColor: "bg-purple-400/30",
    borderColor: "border-purple-400/60",
    textColor: "text-purple-700",
    shortcuts: {
      mac: ["Fn", "Control"],
      windows: ["Ctrl", "Window key", "Alt"],
    },
  },
  {
    id: "ask",
    title: "Ask",
    animation: askaiAnimation,
    bgColor: "bg-emerald-400/30",
    borderColor: "border-emerald-400/60",
    textColor: "text-emerald-700",
    shortcuts: {
      mac: ["Control", "Space"],
      windows: ["Ctrl", "Space"],
    },
  },
];

export function LearnSection() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition <= sectionTop + sectionHeight
      ) {
        const progress = (scrollPosition - sectionTop) / sectionHeight;
        const featureIndex = Math.min(
          Math.floor(progress * features.length),
          features.length - 1
        );
        setActiveFeatureIndex(featureIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Layout */}
      <section
        ref={sectionRef}
        className="hidden lg:block p-6 sm:p-8 lg:p-12 py-20 sm:py-24 lg:py-32 relative"
        style={{ minHeight: `${features.length * 100}vh` }}
      >
        <div className="sticky top-24 grid grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
          {/* Left Side - Content */}
          <div className="flex flex-col justify-center h-full">
            <div className="text-base font-mono text-emerald-800 font-medium mb-2 tracking-wide">
              [LEARN]
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-3 leading-tight tracking-tight">
              You speak, we listen
            </h2>

            <p className="text-gray-600 text-base leading-relaxed mb-8 font-mono">
              Master the essential features to boost your productivity
            </p>

            {/* Features List */}
            <div className="space-y-12">
              {features.map((feature, index) => (
                <div
                  key={feature.id}
                  className={`transition-opacity duration-300 ${
                    index === activeFeatureIndex ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-10 h-10 ${feature.bgColor} flex items-center justify-center flex-shrink-0`}
                    >
                      {feature.id === "dictation" && (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          />
                        </svg>
                      )}
                      {feature.id === "command" && (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      )}
                      {feature.id === "ask" && (
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-700 mb-2">
                        {feature.title}
                      </h3>
                      <div className="text-gray-700 font-mono text-[14px] leading-loose">
                        {feature.id === "ask" ? "Press" : "Hold"}{" "}
                        <KeyboardKey
                          keys={feature.shortcuts.mac}
                          platform="mac"
                        />{" "}
                        on Mac or{" "}
                        <KeyboardKey
                          keys={feature.shortcuts.windows}
                          platform="windows"
                        />{" "}
                        on Windows to start {feature.title.toLowerCase()}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Animation */}
          <div className="flex items-stretch justify-center">
            <div
              className={`w-full border-2 border-dashed p-6 transition-colors duration-300 ${features[activeFeatureIndex].bgColor} ${features[activeFeatureIndex].borderColor}`}
            >
              <div className="w-full h-full bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                <LottieAnimation
                  animationData={features[activeFeatureIndex].animation}
                  className="!mt-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Layout */}
      <section className="lg:hidden p-6 sm:p-8 py-24 sm:py-28">
        <div className="text-base font-mono text-emerald-800 font-medium mb-2 tracking-wide">
          [LEARN]
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3 leading-tight tracking-tight">
          You speak, we listen
        </h2>

        <p className="text-gray-600 text-base leading-relaxed mb-8 font-mono">
          Master the essential features to boost your productivity
        </p>

        <div className="space-y-12">
          {features.map((feature) => (
            <div key={feature.id} className="space-y-4">
              {/* Feature details on top */}
              <div className="flex items-start gap-3">
                <div
                  className={`w-10 h-10 ${feature.bgColor} flex items-center justify-center flex-shrink-0`}
                >
                  {feature.id === "dictation" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                      />
                    </svg>
                  )}
                  {feature.id === "command" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  )}
                  {feature.id === "ask" && (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-700 mb-2 tracking-tight">
                    {feature.title}
                  </h3>
                  <div className="text-gray-700 font-mono text-sm leading-loose">
                    {feature.id === "ask" ? "Press" : "Hold"}{" "}
                    <KeyboardKey keys={feature.shortcuts.mac} platform="mac" />{" "}
                    on Mac or{" "}
                    <KeyboardKey
                      keys={feature.shortcuts.windows}
                      platform="windows"
                    />{" "}
                    on Windows to start {feature.title.toLowerCase()}
                  </div>
                </div>
              </div>

              {/* Animation below */}
              <div className="w-full">
                <div
                  className={`w-full border-2 border-dashed p-4 ${feature.bgColor} ${feature.borderColor}`}
                >
                  <div className="w-full aspect-video bg-white rounded border border-gray-200 flex items-center justify-center overflow-hidden">
                    <LottieAnimation
                      animationData={feature.animation}
                      className="!mt-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
