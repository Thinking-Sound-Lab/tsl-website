import { NextRequest, NextResponse } from "next/server";
import {
  FAL_STUDIO_ENDPOINTS,
  createGenerationErrorResponse,
  submitImageGeneration,
} from "@/lib/fal/studio";
import type {
  ImageAspectRatio,
  ImageGenerationSettings,
  ImageResolution,
} from "@/types/studio";

const IMAGE_ASPECT_RATIOS: ImageAspectRatio[] = [
  "auto",
  "1:1",
  "16:9",
  "9:16",
  "4:3",
  "3:4",
];

const IMAGE_RESOLUTIONS: ImageResolution[] = ["1024", "2048", "4096"];

function parseImageSettings(
  prompt: string,
  aspectRatioValue: FormDataEntryValue | null,
  countValue: FormDataEntryValue | null,
  resolutionValue: FormDataEntryValue | null,
  attachments: File[]
): ImageGenerationSettings {
  const aspectRatio = IMAGE_ASPECT_RATIOS.includes(
    aspectRatioValue as ImageAspectRatio
  )
    ? (aspectRatioValue as ImageAspectRatio)
    : "1:1";
  const count = Math.min(
    4,
    Math.max(1, Number.parseInt(String(countValue ?? "1"), 10) || 1)
  );
  const resolution = IMAGE_RESOLUTIONS.includes(
    resolutionValue as ImageResolution
  )
    ? (resolutionValue as ImageResolution)
    : "2048";

  return {
    aspectRatio,
    model: "nano-banana-2",
    count,
    resolution,
    isEdit: attachments.length > 0,
    attachmentCount: attachments.length,
  };
}

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const prompt = String(formData.get("prompt") ?? "").trim();
  const attachments = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);
  const settings = parseImageSettings(
    prompt,
    formData.get("aspectRatio"),
    formData.get("count"),
    formData.get("resolution"),
    attachments
  );
  const providerModel = settings.isEdit
    ? FAL_STUDIO_ENDPOINTS.imageEdit
    : FAL_STUDIO_ENDPOINTS.image;

  if (!prompt) {
    return NextResponse.json(
      createGenerationErrorResponse(
        "image",
        prompt,
        providerModel,
        settings,
        new Error("Prompt is required.")
      ),
      { status: 400 }
    );
  }

  try {
    const generation = await submitImageGeneration({
      prompt,
      aspectRatio: settings.aspectRatio,
      count: settings.count,
      resolution: settings.resolution,
      attachments,
    });

    return NextResponse.json(generation.response);
  } catch (error) {
    return NextResponse.json(
      createGenerationErrorResponse(
        "image",
        prompt,
        providerModel,
        settings,
        error
      ),
      { status: 500 }
    );
  }
}
