import { NextRequest, NextResponse } from "next/server";
import { getGenerationStatus } from "@/lib/fal/studio";
import type {
  GenerationJobResponse,
  ImageGenerationSettings,
  StudioMode,
  VideoGenerationSettings,
} from "@/types/studio";

function parseRequestSettings(
  mode: StudioMode,
  payload: string | null
): ImageGenerationSettings | VideoGenerationSettings {
  if (!payload) {
    throw new Error("Missing request settings.");
  }

  const parsed = JSON.parse(payload) as
    | ImageGenerationSettings
    | VideoGenerationSettings;

  if (mode === "image" && parsed.model !== "nano-banana-2") {
    throw new Error("Invalid image request settings.");
  }

  if (mode === "video" && parsed.model !== "kling-3") {
    throw new Error("Invalid video request settings.");
  }

  return parsed;
}

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    requestId?: string;
    endpointId?: string;
    type?: StudioMode;
    prompt?: string;
    requestSettings?: string;
  };
  const requestId = body.requestId ?? null;
  const endpointId = body.endpointId ?? null;
  const type = body.type ?? null;
  const prompt = body.prompt ?? "";
  const requestSettingsPayload = body.requestSettings ?? null;

  if (!requestId || !endpointId || (type !== "image" && type !== "video")) {
    return NextResponse.json(
      {
        error: "Missing required generation status parameters.",
      },
      { status: 400 }
    );
  }

  try {
    const requestSettings = parseRequestSettings(type, requestSettingsPayload);
    const response = await getGenerationStatus(
      endpointId,
      requestId,
      prompt,
      type,
      requestSettings
    );

    return NextResponse.json(response);
  } catch (error) {
    const failure: GenerationJobResponse = {
      jobId: requestId,
      status: "failed",
      type,
      outputs: [],
      prompt,
      providerModel: endpointId,
      requestSettings:
        type === "image"
          ? {
              aspectRatio: "1:1",
              model: "nano-banana-2",
              count: 1,
              resolution: "2048",
              isEdit: false,
              attachmentCount: 0,
            }
          : {
              aspectRatio: "16:9",
              duration: 5,
              model: "kling-3",
              audio: true,
            },
      createdAt: new Date().toISOString(),
      error: error instanceof Error ? error.message : "Failed to fetch status.",
    };

    return NextResponse.json(failure, { status: 500 });
  }
}
