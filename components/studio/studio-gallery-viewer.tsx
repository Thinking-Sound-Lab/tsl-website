"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useStudioGalleryViewer } from "@/hooks/use-studio-gallery-viewer";
import { cn } from "@/lib/utils";

function ViewerNavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "previous" | "next";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "previous" ? "Previous asset" : "Next asset"}
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur transition",
        disabled
          ? "cursor-not-allowed opacity-35"
          : "hover:bg-black/70"
      )}
    >
      <svg
        className={cn("h-5 w-5", direction === "next" ? "" : "rotate-180")}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
}

export function StudioGalleryViewer() {
  const {
    assets,
    selectedAsset,
    selectedIndex,
    isOpen,
    hasPrevious,
    hasNext,
    closeViewer,
    goToNext,
    goToPrevious,
  } = useStudioGalleryViewer();

  return (
    <AnimatePresence>
      {isOpen && selectedAsset ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-6"
          onClick={closeViewer}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 24 }}
            className="relative flex h-full w-full max-w-7xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0a]/95 shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4 sm:px-6">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  Studio Viewer
                </p>
                <p className="mt-1 text-sm text-white/72">
                  {selectedIndex + 1} / {assets.length}
                </p>
              </div>

              <button
                type="button"
                onClick={closeViewer}
                aria-label="Close viewer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/45 text-white transition hover:bg-black/65"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="grid min-h-0 flex-1 gap-4 p-4 sm:grid-cols-[auto,minmax(0,1fr),auto] sm:items-center sm:p-6">
              <div className="hidden sm:flex sm:justify-start">
                <ViewerNavButton
                  direction="previous"
                  disabled={!hasPrevious}
                  onClick={goToPrevious}
                />
              </div>

              <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/8 bg-black/45">
                {selectedAsset.type === "video" ? (
                  <video
                    key={selectedAsset.id}
                    src={selectedAsset.url}
                    controls
                    autoPlay
                    playsInline
                    preload="metadata"
                    className="max-h-full w-full object-contain"
                  />
                ) : (
                  <div className="relative h-full min-h-[40vh] w-full">
                    <Image
                      key={selectedAsset.id}
                      src={selectedAsset.url}
                      alt={`Generated image ${selectedIndex + 1}`}
                      fill
                      className="object-contain"
                      priority
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="hidden sm:flex sm:justify-end">
                <ViewerNavButton
                  direction="next"
                  disabled={!hasNext}
                  onClick={goToNext}
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between gap-3">
                <span className="inline-flex self-start rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
                  {selectedAsset.providerModel}
                </span>
                <div className="flex items-center gap-3 sm:hidden">
                  <ViewerNavButton
                    direction="previous"
                    disabled={!hasPrevious}
                    onClick={goToPrevious}
                  />
                  <ViewerNavButton
                    direction="next"
                    disabled={!hasNext}
                    onClick={goToNext}
                  />
                </div>
              </div>

              <p className="max-w-4xl text-sm leading-6 text-white/72">
                {selectedAsset.prompt}
              </p>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
