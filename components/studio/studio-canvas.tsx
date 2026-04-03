"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { GenerationDisplay } from "./generation-display";
import { GenerationLoading } from "./generation-loading";
import { StudioGalleryViewer } from "./studio-gallery-viewer";

interface StudioCanvasProps {
  isGenerating: boolean;
  error: string | null;
}

export function StudioCanvas({ isGenerating, error }: StudioCanvasProps) {
  const canvasAssets = useStudioStore((state) => state.canvasAssets);
  const hasGeneration = isGenerating || canvasAssets.length > 0;
  const canvasClassName = hasGeneration
    ? "flex-1 overflow-auto px-4 pb-[200px] pt-4"
    : "relative flex-1 overflow-auto px-4 pb-[200px] bg-[radial-gradient(circle_at_50%_34%,rgba(245,78,0,0.16),transparent_22%),radial-gradient(circle_at_38%_38%,rgba(36,162,255,0.12),transparent_20%),radial-gradient(circle_at_64%_62%,rgba(255,209,71,0.1),transparent_18%),linear-gradient(180deg,rgba(24,20,12,0.3)_0%,rgba(20,18,11,0.08)_46%,rgba(20,18,11,0.36)_100%)]";

  return (
    <div className={canvasClassName}>
      {!hasGeneration ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.08),rgba(255,255,255,0.02)_18%,rgba(255,255,255,0)_38%)]" />
          <div className="pointer-events-none absolute left-1/2 top-[34%] h-[56rem] w-[72rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,78,0,0.18),rgba(245,78,0,0.06)_38%,rgba(245,78,0,0)_72%)] blur-3xl" />
          <div className="pointer-events-none absolute left-[28%] top-[38%] h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(36,162,255,0.13),rgba(36,162,255,0.04)_40%,rgba(36,162,255,0)_74%)] blur-3xl" />
          <div className="pointer-events-none absolute left-[72%] top-[58%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,209,71,0.14),rgba(255,209,71,0.04)_42%,rgba(255,209,71,0)_76%)] blur-3xl" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-[linear-gradient(to_bottom,rgba(20,18,11,0)_0%,rgba(20,18,11,0.1)_44%,rgba(20,18,11,0.3)_100%)] blur-2xl" />
        </>
      ) : null}

      <AnimatePresence mode="wait">
        {canvasAssets.length > 0 ? (
          <motion.div
            key="canvas-assets"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
          >
            <GenerationDisplay assets={canvasAssets} />
            {isGenerating ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-[1.25rem] bg-background/35 backdrop-blur-[2px]"
              >
                <GenerationLoading />
              </motion.div>
            ) : null}
          </motion.div>
        ) : isGenerating ? (
          <GenerationLoading key="loading" />
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-xl rounded-2xl border border-red-500/20 bg-red-500/5 px-6 py-5 text-center"
          >
            <p className="text-sm font-medium text-red-500">Generation failed</p>
            <p className="mt-2 text-sm text-foreground/70">{error}</p>
          </motion.div>
        ) : (
          <motion.div
            key="placeholder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mx-auto mt-[12vh] flex min-h-[52vh] w-full max-w-4xl items-center justify-center overflow-hidden rounded-[2rem]"
          >
            <div className="pointer-events-none absolute inset-x-10 top-10 bottom-10 rounded-[1.75rem] bg-background/8 backdrop-blur-[3px]" />

            <div className="relative z-10 max-w-2xl px-8 text-center">
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-foreground/35">
                Studio Playground
              </p>
              <h1 className="text-3xl font-medium tracking-[-0.04em] text-foreground/45 select-none md:text-5xl lg:text-6xl">
                Build the scene you&apos;d make if limits disappeared.
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-foreground/38 md:text-base">
                Start with a prompt, a frame, or a wild idea and shape it into
                something cinematic.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <StudioGalleryViewer />
    </div>
  );
}
