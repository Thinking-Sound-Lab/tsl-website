import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Hero() {
  return (
    <section className="min-h-screen">
      {/* Content area without container or border */}
      <div className="min-h-[calc(100vh-4rem)] sm:min-h-[calc(100vh-6rem)] lg:min-h-[calc(100vh-8rem)] flex flex-col justify-between p-4 sm:p-6 md:p-8 lg:p-16 pt-4 sm:pt-6 lg:pt-0 relative">
        {/* Top section - Main headline */}
        <div className="max-w-full sm:max-w-2xl lg:max-w-3xl mt-8 sm:mt-12 lg:mt-16 xl:mt-20 relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold leading-tight text-emerald-700 tracking-tight text-balance">
            The On Demand <br /> AI Dictation and <br /> Search Anywhere
          </h1>
        </div>

        {/* Broken Keyboard - Center on mobile, Right on desktop */}
        <div className="absolute inset-0 flex items-center justify-center lg:justify-end lg:pr-8 xl:pr-16 z-0">
          <Image
            src="/bk.png"
            alt="Broken keyboard"
            width={800}
            height={600}
            className="w-96 h-72 sm:w-[28rem] sm:h-80 md:w-[32rem] md:h-96 lg:w-[40rem] lg:h-[30rem] xl:w-[48rem] xl:h-[36rem] opacity-80 object-contain"
            priority={false}
          />
        </div>

        {/* Bottom section - Subtitle and CTA */}
        <div className="max-w-full sm:max-w-lg lg:max-w-xl mt-8 sm:mt-12 lg:mt-0 relative z-10">
          <p className="text-base sm:text-lg lg:text-lg font-mono text-emerald-700 mb-6 sm:mb-8 leading-relaxed">
            Transform your voice into powerful, searchable content with advanced
            AI technology
          </p>

          <Button variant="emerald" size="lg">
            Download
          </Button>
        </div>
      </div>
    </section>
  );
}
