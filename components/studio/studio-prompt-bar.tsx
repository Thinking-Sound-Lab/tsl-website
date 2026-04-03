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
      <div className="max-w-3xl mx-auto">
        {/* Settings row */}
        <AnimatePresence mode="wait">
          {mode === "image" ? (
            <motion.div
              key="image-settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-2 px-2"
            >
              <ImageSettings />
            </motion.div>
          ) : (
            <motion.div
              key="video-settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="mb-2 px-2"
            >
              <VideoSettings />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main prompt row */}
        <div className="flex items-end gap-3">
          <ModeSwitcher />
          <PromptInput />
        </div>
      </div>
    </motion.div>
  );
}
