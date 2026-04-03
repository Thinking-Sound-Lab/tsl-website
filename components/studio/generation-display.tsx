"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { setDraggedStudioAsset } from "@/lib/studio-drag";
import { cn } from "@/lib/utils";
import { useStudioStore } from "@/store/useStudioStore";
import type { StudioCanvasAsset } from "@/types/studio";

interface GenerationDisplayProps {
  assets: StudioCanvasAsset[];
}

function getAspectRatioValue(aspectRatio?: string) {
  if (!aspectRatio || aspectRatio === "auto") {
    return undefined;
  }

  return aspectRatio.replace(":", " / ");
}

export function GenerationDisplay({ assets }: GenerationDisplayProps) {
  const openViewer = useStudioStore((state) => state.openViewer);
  const isSingle = assets.length === 1;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "w-full",
        isSingle
          ? "max-w-xl"
          : "grid max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      )}
    >
      {assets.map((asset, index) => {
        const aspectRatio = getAspectRatioValue(asset.aspectRatio);

        return (
          <button
            key={asset.id}
            type="button"
            onClick={() => openViewer(asset.id)}
            className={cn(
              "group relative overflow-hidden rounded-[1.25rem] border border-border/60 bg-secondary/70 text-left shadow-lg transition hover:border-foreground/20 hover:shadow-xl",
              isSingle ? "w-full max-w-sm" : "w-full"
            )}
            style={aspectRatio ? { aspectRatio } : undefined}
          >
            {asset.type === "video" ? (
              <video
                src={asset.url}
                className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                playsInline
                muted
                preload="metadata"
              />
            ) : (
              <Image
                src={asset.url}
                alt={`Generated image ${index + 1}`}
                fill
                className="object-cover transition duration-300 group-hover:scale-[1.02]"
                unoptimized
                draggable
                onDragStart={(event) => {
                  setDraggedStudioAsset(event.dataTransfer, {
                    url: asset.url,
                    fileName: asset.fileName,
                    contentType: asset.contentType,
                  });
                }}
              />
            )}

            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/75 via-black/20 to-transparent p-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/70">
                  {asset.type === "video" ? "Video" : "Image"}
                </p>
                <p className="mt-1 text-sm text-white/92">Asset {index + 1}</p>
              </div>
              <span className="rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[11px] font-medium text-white/78">
                Open
              </span>
            </div>
          </button>
        );
      })}
    </motion.div>
  );
}
