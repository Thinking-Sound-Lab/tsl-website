"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GenerationJobResponse } from "@/types/studio";

interface GenerateImageInput {
  prompt: string;
  aspectRatio: string;
  count: number;
  resolution: string;
  attachments: File[];
}

async function parseGenerationResponse(response: Response) {
  const payload = (await response.json()) as GenerationJobResponse;

  if (!response.ok || payload.status === "failed") {
    throw new Error(payload.error || "Image generation failed.");
  }

  return payload;
}

function buildStatusPayload(response: GenerationJobResponse) {
  return {
    requestId: response.jobId,
    endpointId: response.providerModel,
    type: response.type,
    prompt: response.prompt,
    requestSettings: JSON.stringify(response.requestSettings),
  };
}

export function useGenerateImage() {
  const [data, setData] = useState<GenerationJobResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const pollTimeoutRef = useRef<number | null>(null);

  const clearPolling = useCallback(() => {
    if (pollTimeoutRef.current !== null) {
      window.clearTimeout(pollTimeoutRef.current);
      pollTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearPolling, [clearPolling]);

  const poll = useCallback(
    async (pendingResponse: GenerationJobResponse) => {
      setIsProcessing(true);

      try {
        const response = await fetch("/api/studio/generate/status", {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(buildStatusPayload(pendingResponse)),
        });
        const payload = await parseGenerationResponse(response);

        setData(payload);

        if (payload.status === "queued" || payload.status === "processing") {
          pollTimeoutRef.current = window.setTimeout(() => {
            void poll(payload);
          }, 1500);
          return;
        }

        setIsProcessing(false);
      } catch (caughtError) {
        setError(
          caughtError instanceof Error
            ? caughtError.message
            : "Image generation failed."
        );
        setIsProcessing(false);
      }
    },
    []
  );

  const mutateAsync = useCallback(
    async (input: GenerateImageInput) => {
      clearPolling();
      setError(null);
      setData(null);
      setIsSubmitting(true);

      const formData = new FormData();
      formData.set("prompt", input.prompt);
      formData.set("aspectRatio", input.aspectRatio);
      formData.set("count", String(input.count));
      formData.set("resolution", input.resolution);
      input.attachments.forEach((attachment) => {
        formData.append("attachments", attachment);
      });

      try {
        const response = await fetch("/api/studio/generate/image", {
          method: "POST",
          body: formData,
        });
        const payload = await parseGenerationResponse(response);

        setData(payload);
        setIsSubmitting(false);
        await poll(payload);
        return payload;
      } catch (caughtError) {
        const message =
          caughtError instanceof Error
            ? caughtError.message
            : "Image generation failed.";
        setError(message);
        setIsSubmitting(false);
        setIsProcessing(false);
        throw caughtError;
      }
    },
    [clearPolling, poll]
  );

  return {
    mutate: (input: GenerateImageInput) => {
      void mutateAsync(input);
    },
    mutateAsync,
    data,
    error,
    isSubmitting,
    isProcessing,
    isPending: isSubmitting || isProcessing,
    reset: () => {
      clearPolling();
      setData(null);
      setError(null);
      setIsSubmitting(false);
      setIsProcessing(false);
    },
  };
}
