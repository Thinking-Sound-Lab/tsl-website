"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useGenerateImage } from "@/hooks/use-generate-image";
import { useGenerateVideo } from "@/hooks/use-generate-video";
import { useStudioStore } from "@/store/useStudioStore";
import type {
  GenerationJobResponse,
  GenerationResult,
  StudioCanvasAsset,
  StudioMode,
  StudioGenerationState,
} from "@/types/studio";

function toGenerationResult(
  response: GenerationJobResponse | null
): GenerationResult | null {
  if (!response || response.status !== "completed") {
    return null;
  }

  return {
    jobId: response.jobId,
    status: "success",
    type: response.type,
    urls: response.outputs.map((output) => output.url),
    outputs: response.outputs,
    prompt: response.prompt,
    providerModel: response.providerModel,
    settings: response.requestSettings,
    createdAt: response.createdAt,
  };
}

function resultToCanvasAssets(
  result: GenerationResult
): StudioCanvasAsset[] {
  return result.outputs.map((output, index) => ({
    id: `${result.jobId}-${index}`,
    jobId: result.jobId,
    outputIndex: index,
    type: result.type,
    url: output.url,
    prompt: result.prompt,
    providerModel: result.providerModel,
    createdAt: result.createdAt,
    contentType: output.contentType,
    fileName: output.fileName,
    aspectRatio: result.settings.aspectRatio,
  }));
}

export function useStudioGeneration() {
  const imageGeneration = useGenerateImage();
  const videoGeneration = useGenerateVideo();
  const studioState = useStudioStore();
  const [validationError, setValidationError] = useState<string | null>(null);
  const [canvasMode, setCanvasMode] = useState<StudioMode | null>(null);

  const canvasGeneration =
    canvasMode === "image"
      ? imageGeneration
      : canvasMode === "video"
        ? videoGeneration
        : null;

  const state = useMemo<StudioGenerationState>(() => {
    const data = canvasGeneration?.data ?? null;
    const error = validationError ?? canvasGeneration?.error ?? null;
    const result = toGenerationResult(data);
    const isSubmitting = canvasGeneration?.isSubmitting ?? false;
    const isProcessing = canvasGeneration?.isProcessing ?? false;

    return {
      status: error
        ? "error"
        : result
          ? "success"
          : isSubmitting
            ? "submitting"
            : isProcessing
              ? "processing"
              : "idle",
      isSubmitting,
      isProcessing,
      isGenerating: isSubmitting || isProcessing,
      result,
      error,
    };
  }, [canvasGeneration, validationError]);

  useEffect(() => {
    if (!state.result) {
      return;
    }

    const hasJobAssets = studioState.canvasAssets.some(
      (asset) => asset.jobId === state.result?.jobId
    );

    if (!hasJobAssets) {
      studioState.appendCanvasAssets(resultToCanvasAssets(state.result));
    }
  }, [state.result, studioState]);

  const generate = useCallback(async () => {
    try {
      const prompt = studioState.prompt.trim();

      if (!prompt || state.isGenerating) {
        return;
      }

      setValidationError(null);

      if (studioState.mode === "image") {
        const attachments = studioState.attachments.map(
          (attachment) => attachment.file
        );

        setCanvasMode("image");
        studioState.setPrompt("");
        studioState.clearAttachments();
        await imageGeneration.mutateAsync({
          prompt,
          aspectRatio: studioState.imageAspectRatio,
          count: studioState.imageCount,
          resolution: studioState.imageResolution,
          attachments,
        });
        return;
      }

      if (!studioState.firstFrame) {
        setValidationError("Upload a first frame before generating video.");
        return;
      }

      const firstFrame = studioState.firstFrame;
      const lastFrame = studioState.lastFrame;

      setCanvasMode("video");
      studioState.setPrompt("");
      studioState.setFirstFrame(null);
      studioState.setLastFrame(null);
      await videoGeneration.mutateAsync({
        prompt,
        aspectRatio: studioState.videoAspectRatio,
        duration: studioState.videoDuration,
        audio: studioState.videoAudio,
        firstFrame,
        lastFrame,
      });
    } catch {
      return;
    }
  }, [imageGeneration, state.isGenerating, studioState, videoGeneration]);

  return {
    generate,
    state,
  };
}
