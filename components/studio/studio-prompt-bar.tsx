"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { ModeSwitcher } from "./mode-switcher";
import { PromptInput } from "./prompt-input";
import { ImageSettings } from "./image-settings";
import { VideoSettings } from "./video-settings";

export function StudioPromptBar() {
  const { mode } = useStudioStore();

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-50 pb-6 px-4"
    >
      {/* Subtle upward gradient glow */}
      <div className="absolute inset-0 -top-32 pointer-events-none bg-gradient-to-t from-background/80 via-background/30 to-transparent" />

      <div className="relative max-w-3xl mx-auto flex items-stretch gap-3">
        <ModeSwitcher />
        <PromptInput>
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
      </div>
    </motion.div>
  );
}
