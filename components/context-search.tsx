// import { LottieAnimation } from "./benefits";
import askaiAnimation from "@/public/assets/askai.json";

export function ContextSearch() {
  return (
    <section className="bg-emerald-500/35 p-6 sm:p-8 lg:px-12 py-8 relative">
      <div className="grid lg:grid-cols-4 gap-8 lg:gap-12 items-stretch min-h-[200px] lg:min-h-[400px]">
        {/* Left Side - Content (2 columns) - Vertically centered */}
        <div className="lg:col-span-2 flex flex-col justify-center">
          <div className="text-base font-mono text-emerald-700 font-medium mb-2 tracking-wide">
            [CONTEXT AWARE SEARCH]
          </div>

          <h3 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-2 leading-tight">
            AI Screen Analysis
          </h3>

          <p className="text-gray-700 text-base leading-relaxed mb-6 font-mono">
            Ask questions about anything on your screen without copy-pasting. AI
            analyzes screen content and provides instant answers about what
            you&rsquo;re viewing.
          </p>
        </div>

        {/* Right Side - Example Box */}
        <div className="lg:col-span-2 flex items-stretch">
          {/* <LottieAnimation
            animationData={askaiAnimation}
            className="!mt-0 flex items-center justify-center !h-full"
          /> */}
        </div>
      </div>
    </section>
  );
}
