import { NextRequest, NextResponse } from "next/server";
import {
  FAL_STUDIO_ENDPOINTS,
  createGenerationErrorResponse,
  submitVideoGeneration,
} from "@/lib/fal/studio";
import type {
  VideoAspectRatio,
  VideoGenerationSettings,
} from "@/types/studio";

const VIDEO_ASPECT_RATIOS: VideoAspectRatio[] = ["16:9", "9:16", "1:1"];
const VIDEO_DURATIONS = new Set([3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

function parseVideoSettings(
  prompt: string,
  aspectRatioValue: FormDataEntryValue | null,
  durationValue: FormDataEntryValue | null,
  audioValue: FormDataEntryValue | null,
  firstFrame: File | null,
  lastFrame: File | null
): VideoGenerationSettings {
  const aspectRatio = VIDEO_ASPECT_RATIOS.includes(
    aspectRatioValue as VideoAspectRatio
  )
    ? (aspectRatioValue as VideoAspectRatio)
    : "16:9";
  const durationCandidate =
    Number.parseInt(String(durationValue ?? "5"), 10) || 5;
  const duration = VIDEO_DURATIONS.has(durationCandidate) ? durationCandidate : 5;
  const audio = String(audioValue ?? "true") === "true";

  return {
    aspectRatio,
    duration,
    model: "kling-3",
    audio,
    firstFrame: firstFrame?.name,
    lastFrame: lastFrame?.name ?? undefined,
  };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const firstFrameEntry = formData.get("firstFrame");
  const lastFrameEntry = formData.get("lastFrame");
  const firstFrame =
    firstFrameEntry instanceof File && firstFrameEntry.size > 0
      ? firstFrameEntry
      : null;
  const lastFrame =
    lastFrameEntry instanceof File && lastFrameEntry.size > 0
      ? lastFrameEntry
      : null;
  const settings = parseVideoSettings(
    prompt,
    formData.get("aspectRatio"),
    formData.get("duration"),
    formData.get("audio"),
    firstFrame,
    lastFrame
  );

  if (!prompt) {
    return NextResponse.json(
      createGenerationErrorResponse(
        "video",
        prompt,
        FAL_STUDIO_ENDPOINTS.video,
        settings,
        new Error("Prompt is required.")
      ),
      { status: 400 }
    );
  }

  if (!firstFrame) {
    return NextResponse.json(
      createGenerationErrorResponse(
        "video",
        prompt,
        FAL_STUDIO_ENDPOINTS.video,
        settings,
        new Error("A first frame is required for Kling 3 image-to-video.")
      ),
      { status: 400 }
    );
  }

  try {
    const generation = await submitVideoGeneration({
      prompt,
      aspectRatio: settings.aspectRatio,
      duration: settings.duration,
      audio: settings.audio,
      firstFrame,
      lastFrame,
    });

    return NextResponse.json(generation.response);
  } catch (error) {
    return NextResponse.json(
      createGenerationErrorResponse(
        "video",
        prompt,
        FAL_STUDIO_ENDPOINTS.video,
        settings,
        error
      ),
      { status: 500 }
    );
  }
}
