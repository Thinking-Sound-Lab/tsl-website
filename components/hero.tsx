"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useWaitlist } from "@/components/waitlist-context";

export function Hero() {
  const [os, setOs] = useState<"mac" | "windows" | "other">("other");

  const { openWaitlist } = useWaitlist();

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("mac") !== -1) {
      setOs("mac");
    } else if (userAgent.indexOf("win") !== -1) {
      setOs("windows");
    }
  }, []);



  const handleJoinWaitlist = (e: React.MouseEvent) => {
    e.preventDefault();
    openWaitlist();
  };

  const getDownloadButtonText = () => {
    if (os === "mac") return "Join Waitlist";
    if (os === "windows") return "Join Waitlist";
    return "Join Waitlist";
  };



  return (
    <section className="min-h-screen">
      {/* Content area without container or border */}
      <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-16 pt-4 sm:pt-6 lg:pt-0 relative">
        {/* Top section - Main headline */}
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mt-8 sm:mt-12 lg:mt-16 xl:mt-20 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-emerald-700 tracking-tight text-balance">
            <span className="block">An AI workspace</span>
            <span className="block">for Drive, Canvas, and</span>
            <span className="block">Ideas.</span>
          </h1>

          {/* Subtitle - Shows below heading on mobile */}
          <p className="lg:hidden text-base sm:text-lg font-mono text-emerald-700 mt-6 leading-relaxed">
            Store, connect, and explore your ideas and research in one focused, distraction-free space.
          </p>

          {/* Mobile: Email input or Download Button */}
          {/* <div className="lg:hidden mt-6">
            {isMobile ? (
              <div className="w-full max-w-md">
                <p className="text-sm sm:text-base font-mono text-emerald-700 mb-3">
                  Send download link to your email
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-2 border border-emerald-600 bg-white/50 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                  <Button
                    variant="emerald"
                    size="default"
                    onClick={handleSendLink}
                    className="whitespace-nowrap"
                  >
                    Send Link
                  </Button>
                </div>
              </div>
            ) : (
              <Link href="/download">
                <Button variant="emerald" size="default">
                  {getDownloadButtonText()}
                </Button>
              </Link>
            )}
          </div> */}
        </div>

        {/* Mobile: Waitlist CTA - Centered and above keyboard */}
        <div className="lg:hidden flex justify-center items-center relative z-10 mb-10 mt-12">
          <div className="w-full max-w-md text-center">
            <p className="text-base sm:text-lg font-mono text-emerald-700 mb-6 text-balance">
              Join the waitlist for early access to Invook.
            </p>

            <button
              onClick={handleJoinWaitlist}
              className="w-full inline-flex items-center justify-center px-6 py-4 text-base font-mono rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
            >
              Join Waitlist
            </button>
          </div>
        </div>

        {/* Broken Keyboard - Below button on mobile, Right on desktop */}
        <div className="lg:absolute lg:inset-0 flex justify-center lg:items-center lg:justify-end lg:pr-4 xl:pr-8 z-0 mb-8 lg:mb-0 mt-8 lg:mt-0">
          <Image
            src="/bk.png"
            alt="Broken keyboard"
            width={800}
            height={600}
            className="w-full max-w-[500px] h-auto sm:max-w-[600px] md:max-w-[700px] lg:w-[36rem] lg:h-[27rem] xl:w-[42rem] xl:h-[32rem] opacity-80 object-contain"
            priority={false}
          />
        </div>

        {/* Desktop: Subtitle and Download button */}
        <div className="hidden lg:block max-w-full sm:max-w-lg lg:max-w-xl mt-8 sm:mt-12 lg:mt-0 relative z-10">
          <p className="text-base sm:text-lg lg:text-lg font-mono text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
            Store, connect, and explore your ideas and research in one focused, distraction-free space.
          </p>

          <button
            onClick={handleJoinWaitlist}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-mono rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
          >
            {getDownloadButtonText()}
          </button>
        </div>
      </div>
    </section>
  );
}