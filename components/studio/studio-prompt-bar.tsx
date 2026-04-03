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
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Subtle upward gradient glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none"
        style={{
          background: "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          opacity: 0.85,
        }}
      />

      <div className="relative pb-6 px-4">
        <div className="max-w-4xl mx-auto flex items-end gap-3">
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
      </div>
    </motion.div>
  );
}
