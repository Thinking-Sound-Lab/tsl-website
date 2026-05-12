"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useStudioStore } from "@/store/useStudioStore";
import { FrameUpload } from "./frame-upload";

interface PromptFooterProps {
  isGenerating: boolean;
  onGenerate: () => void | Promise<void>;
  className?: string;
}

export function PromptFooter({
  isGenerating,
  onGenerate,
  className,
}: PromptFooterProps) {
  const {
    prompt,
    mode,
    firstFramePreview,
    setFirstFrame,
    lastFramePreview,
    setLastFrame,
  } = useStudioStore();

  const canSubmit =
    prompt.trim().length > 0 &&
    !isGenerating &&
    (mode === "image" || Boolean(firstFramePreview));

  return (
    <div
      className={cn(
        "flex shrink-0 items-end justify-end px-3 pb-3 pt-3 md:pt-3",
        className
      )}
    >
      <div className="w-full md:w-auto">
        {mode === "video" ? (
          <div className="flex min-h-11 items-center gap-2 md:hidden">
            <FrameUpload
              label="First Frame"
              preview={firstFramePreview}
              onUpload={setFirstFrame}
              compact
              className="min-w-0 flex-1"
            />
            <FrameUpload
              label="Last Frame"
              preview={lastFramePreview}
              onUpload={setLastFrame}
              compact
              className="min-w-0 flex-1"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                void onGenerate();
              }}
              disabled={!canSubmit}
              className="flex h-11 min-w-[7.75rem] shrink-0 items-center justify-center rounded-xl bg-[#F54E00] px-5 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(245,78,0,0.28)] transition-colors hover:bg-[#e04500] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isGenerating ? "Working..." : "Generate"}
            </motion.button>
          </div>
        ) : (
          <div className="flex min-h-11 items-center md:hidden">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                void onGenerate();
              }}
              disabled={!canSubmit}
              className="flex h-11 w-full items-center justify-center rounded-xl bg-[#F54E00] px-4 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(245,78,0,0.28)] transition-colors hover:bg-[#e04500] disabled:cursor-not-allowed disabled:opacity-30"
            >
              {isGenerating ? "Working..." : "Generate"}
            </motion.button>
          </div>
        )}

        <div className="hidden items-end gap-2 md:flex">
          {mode === "video" ? (
            <FrameUpload
              label="First Frame"
              preview={firstFramePreview}
              onUpload={setFirstFrame}
              compact
            />
          ) : null}
          {mode === "video" ? (
            <FrameUpload
              label="Last Frame"
              preview={lastFramePreview}
              onUpload={setLastFrame}
              compact
            />
          ) : null}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              void onGenerate();
            }}
            disabled={!canSubmit}
            className="flex h-[90px] w-24 items-center justify-center rounded-xl bg-[#F54E00] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#e04500] disabled:cursor-not-allowed disabled:opacity-30"
          >
            {isGenerating ? "Working..." : "Generate"}
          </motion.button>
        </div>
      </div>
    </div>
  );
}
