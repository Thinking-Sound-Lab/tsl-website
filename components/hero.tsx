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
    return "Join Waitlist";
  };

  return (
    <section className="bg-background pt-20 pb-24">
      <div className="container mx-auto max-w-[1400px]">
        <div className="flex flex-col items-start max-w-3xl">
          <h1 className="text-xl sm:text-[24px] md:text-[28px] text-foreground mb-8 max-w-lg text-balance tracking-tighter">
            Store, connect, and explore your ideas and research in one focused, distraction-free space.
          </h1>

          <button
            onClick={handleJoinWaitlist}
            className="inline-flex items-center justify-center h-10 px-6 text-sm font-medium rounded-full text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring transition-colors shadow-sm"
          >
            {getDownloadButtonText()}
          </button>
        </div>
        
        <div className="mt-12 md:mt-16 w-full rounded-lg overflow-hidden border bg-muted shadow-xl">
          <Image
            src="/images/hero.png"
            alt="App Screenshot"
            width={1216}
            height={600}
            className="w-full h-auto object-cover"
            priority
            quality={100}
          />
        </div>
      </div>
    </section>
  );
}