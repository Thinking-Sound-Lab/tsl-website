"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const [email, setEmail] = useState("");
  const [os, setOs] = useState<"mac" | "windows" | "other">("other");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Detect OS
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("mac") !== -1) {
      setOs("mac");
    } else if (userAgent.indexOf("win") !== -1) {
      setOs("windows");
    }
  }, []);

  const handleSendLink = async () => {
    if (!email || isLoading || isSent) return;

    setIsLoading(true);
    setError("");

    try {
      const platform = os === "mac" || os === "windows" ? os : "mac";

      const response = await fetch("/api/send-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          platform,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setIsSent(true);
        setEmail("");
        // Reset after 3 seconds
        setTimeout(() => {
          setIsSent(false);
        }, 3000);
      } else {
        setError(data.error || "Failed to send download link");
      }
    } catch (_) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDownloadButtonText = () => {
    if (os === "mac") return "Download for Mac";
    if (os === "windows") return "Download for Windows";
    return "Download";
  };

  const getDownloadLink = () => {
    return "/downloads";
  };

  return (
    <section className="min-h-screen">
      {/* Content area without container or border */}
      <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-16 pt-4 sm:pt-6 lg:pt-0 relative">
        {/* Top section - Main headline */}
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mt-8 sm:mt-12 lg:mt-16 xl:mt-20 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-emerald-700 tracking-tight text-balance">
            <span className="block">An AI workspace</span>
            <span className="block">for Drive, Research, and</span>
            <span className="block">Canvas</span>
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

        {/* Mobile: Email input form - Centered and above keyboard */}
        <div className="lg:hidden flex justify-center items-center relative z-10 mb-10 mt-12">
          <div className="w-full max-w-md">
            <p className="text-base sm:text-lg font-mono text-emerald-700 mb-4 text-center text-balance">
              On a mobile device? Send Invook to your work station.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 bg-white/50 text-gray-900 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                disabled={isLoading || isSent}
              />
              <Button
                variant="emerald"
                size="default"
                onClick={handleSendLink}
                disabled={isLoading || isSent || !email}
                className="whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                ) : isSent ? (
                  "Link Sent"
                ) : (
                  "Send Link"
                )}
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2 text-center">{error}</p>
            )}
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

          <Link href={getDownloadLink()}>
            <Button variant="emerald" size="lg">
              {getDownloadButtonText()}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}