"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStudioStore } from "@/store/useStudioStore";

function getAspectRatioValue(aspectRatio?: string) {
  if (!aspectRatio || aspectRatio === "auto") {
    return undefined;
  }

  return aspectRatio.replace(":", " / ");
}

function getMediaWidthClass(aspectRatio?: string) {
  switch (aspectRatio) {
    case "9 / 16":
      return "max-w-[14rem]";
    case "1 / 1":
      return "max-w-lg";
    default:
      return "max-w-xl";
  }
}

export function GenerationLoading() {
  const { mode, imageAspectRatio, imageCount, videoAspectRatio } = useStudioStore();

  const aspectRatio = getAspectRatioValue(
    mode === "image" ? imageAspectRatio : videoAspectRatio
  );
  const skeletonCount = mode === "image" ? imageCount : 1;
  const isSingle = skeletonCount === 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn(
        "w-full",
        mode === "video"
          ? getMediaWidthClass(aspectRatio)
          : cn(
              "max-w-xl",
              isSingle ? "flex" : "grid grid-cols-2 gap-3"
            )
      )}
    >
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "relative overflow-hidden rounded-xl border border-border/20 bg-secondary/70",
            mode === "video"
              ? "w-full shadow-lg"
              : isSingle
                ? "w-full max-w-sm shadow-lg"
                : "w-full shadow-lg"
          )}
          style={aspectRatio ? { aspectRatio } : undefined}
        >
          <motion.div
            className="absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.02)_8%,rgba(255,255,255,0.12)_18%,rgba(255,255,255,0.02)_33%)]"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,78,0,0.14),transparent_45%)]" />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-[linear-gradient(to_top,rgba(255,255,255,0.06),transparent)]" />
        </div>
      ))}
    </motion.div>
  );
}
