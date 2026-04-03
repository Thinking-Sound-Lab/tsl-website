"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { GenerationLoading } from "./generation-loading";
import { GenerationDisplay } from "./generation-display";

export function StudioCanvas() {
  const { isGenerating, generationResult } = useStudioStore();

  return (
    <div className="flex-1 flex items-center justify-center px-4 pb-[200px] overflow-auto">
      <AnimatePresence mode="wait">
        {isGenerating ? (
          <GenerationLoading key="loading" />
        ) : generationResult ? (
          <GenerationDisplay key="result" result={generationResult} />
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center max-w-2xl"
          >
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-light tracking-tight text-foreground/20 select-none">
              What will you create with Infinite budget
            </h1>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
