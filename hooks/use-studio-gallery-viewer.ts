"use client";

import { useEffect, useMemo, useRef } from "react";
import { useStudioStore } from "@/store/useStudioStore";

export function useStudioGalleryViewer() {
  const canvasAssets = useStudioStore((state) => state.canvasAssets);
  const selectedAssetId = useStudioStore((state) => state.selectedAssetId);
  const closeViewer = useStudioStore((state) => state.closeViewer);
  const goToNext = useStudioStore((state) => state.goToNext);
  const goToPrevious = useStudioStore((state) => state.goToPrevious);

  const selectedIndex = useMemo(
    () =>
      selectedAssetId
        ? canvasAssets.findIndex((asset) => asset.id === selectedAssetId)
        : -1,
    [canvasAssets, selectedAssetId]
  );

  const selectedAsset =
    selectedIndex >= 0 ? canvasAssets[selectedIndex] : null;
  const isOpen = selectedIndex >= 0;
  const hasPrevious = selectedIndex > 0;
  const hasNext = selectedIndex >= 0 && selectedIndex < canvasAssets.length - 1;
  const onKeyDownRef = useRef<(event: KeyboardEvent) => void>(() => {});

  onKeyDownRef.current = (event: KeyboardEvent) => {
    if (!isOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeViewer();
      return;
    }

    if (event.key === "ArrowLeft" && hasPrevious) {
      goToPrevious();
      return;
    }

    if (event.key === "ArrowRight" && hasNext) {
      goToNext();
    }
  };

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      onKeyDownRef.current(event);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return {
    assets: canvasAssets,
    selectedAsset,
    selectedIndex,
    isOpen,
    hasPrevious,
    hasNext,
    closeViewer,
    goToNext,
    goToPrevious,
  };
}
