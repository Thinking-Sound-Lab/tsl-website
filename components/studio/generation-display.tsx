"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { GenerationResult } from "@/types/studio";
import { cn } from "@/lib/utils";

interface GenerationDisplayProps {
  result: GenerationResult;
}

export function GenerationDisplay({ result }: GenerationDisplayProps) {
  const isSingle = result.urls.length === 1;

  if (result.type === "video") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl mx-auto"
      >
        <div className="relative aspect-video rounded-xl overflow-hidden bg-secondary shadow-lg">
          <video
            src={result.urls[0]}
            controls
            className="w-full h-full object-cover"
            poster={result.urls[0]}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full max-w-3xl mx-auto",
        isSingle ? "flex justify-center" : "grid grid-cols-2 gap-3"
      )}
    >
      {result.urls.map((url, i) => (
        <div
          key={i}
          className={cn(
            "relative overflow-hidden rounded-xl bg-secondary shadow-lg",
            isSingle ? "w-full max-w-lg aspect-square" : "aspect-square"
          )}
        >
          <Image
            src={url}
            alt={`Generated image ${i + 1}`}
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      ))}
    </motion.div>
  );
}
