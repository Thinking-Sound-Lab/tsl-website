"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { ImageSettings } from "./image-settings";
import { ModeSwitcher } from "./mode-switcher";
import { PromptFooter } from "./prompt-footer";
import { PromptInput } from "./prompt-input";
import { VideoSettings } from "./video-settings";

interface StudioPromptBarProps {
  isGenerating: boolean;
  onGenerate: () => void | Promise<void>;
}

export function StudioPromptBar({
  isGenerating,
  onGenerate,
}: StudioPromptBarProps) {
  const { mode } = useStudioStore();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none bg-[linear-gradient(to_bottom,rgba(20,18,11,0)_0%,rgba(20,18,11,0.08)_26%,rgba(20,18,11,0.18)_56%,rgba(20,18,11,0.34)_100%)]" />

      <div className="relative pb-6 px-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
          <ModeSwitcher className="hidden md:flex" />
          <div className="flex-1">
            <ModeSwitcher
              orientation="horizontal"
              className="mb-3 inline-flex md:hidden"
            />
            <div className="relative flex items-end bg-secondary rounded-2xl border border-border/50 overflow-hidden">
              <div className="absolute left-1/2 top-1 z-10 hidden -translate-x-1/2 items-center justify-center py-1 md:flex">
                <div className="h-1 w-10 rounded-full bg-foreground/10 transition-colors group-hover:bg-foreground/25" />
              </div>

              <PromptInput
                isGenerating={isGenerating}
                onGenerate={onGenerate}
              >
                <AnimatePresence mode="wait">
                  {mode === "image" ? (
                    <motion.div
                      key="image-settings"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <ImageSettings />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="video-settings"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      transition={{ duration: 0.15 }}
                    >
                      <VideoSettings />
                    </motion.div>
                  )}
                </AnimatePresence>
              </PromptInput>
              <PromptFooter
                isGenerating={isGenerating}
                onGenerate={onGenerate}
                className="hidden md:flex"
              />
            </div>
            <PromptFooter
              isGenerating={isGenerating}
              onGenerate={onGenerate}
              className="px-0 pb-0 pt-3 md:hidden"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
