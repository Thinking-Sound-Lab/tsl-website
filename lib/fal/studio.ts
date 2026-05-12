import { fal } from "@fal-ai/client";
import type { QueueStatus } from "@fal-ai/client";
import type {
  GeneratedMediaOutput,
  GenerationJobResponse,
  ImageAspectRatio,
  ImageGenerationSettings,
  ImageResolution,
  ProviderJobStatus,
  VideoAspectRatio,
  VideoGenerationSettings,
} from "@/types/studio";

const FAL_IMAGE_ENDPOINT = "fal-ai/nano-banana-2";
const FAL_IMAGE_EDIT_ENDPOINT = "fal-ai/nano-banana-2/edit";
const FAL_VIDEO_ENDPOINT = "fal-ai/kling-video/v3/pro/image-to-video";
const FAL_VIDEO_QUEUE_ENDPOINT = "fal-ai/kling-video/v3/pro";

type FalFileOutput = {
  url?: string;
  content_type?: string;
  file_name?: string;
};

type ImageGenerationInput = {
  prompt: string;
  aspectRatio: ImageAspectRatio;
  count: number;
  resolution: ImageResolution;
  attachments: File[];
};

type VideoGenerationInput = {
  prompt: string;
  aspectRatio: VideoAspectRatio;
  duration: number;
  audio: boolean;
  firstFrame: File;
  lastFrame: File | null;
};

function ensureFalConfigured() {
  const falKey = process.env.FAL_KEY;

  if (!falKey) {
    throw new Error("Missing FAL_KEY environment variable.");
  }

  fal.config({
    credentials: falKey,
  });
}

function mapProviderStatus(status: QueueStatus["status"]): ProviderJobStatus {
  if (status === "IN_QUEUE") {
    return "queued";
  }

  if (status === "IN_PROGRESS") {
    return "processing";
  }

  return "completed";
}

function normalizeOutputs(files: FalFileOutput[] | undefined): GeneratedMediaOutput[] {
  if (!Array.isArray(files)) {
    return [];
  }

  return files
    .filter((file): file is FalFileOutput & { url: string } => Boolean(file?.url))
    .map((file) => ({
      url: file.url,
      contentType: file.content_type,
      fileName: file.file_name,
    }));
}

function toQueueEndpointId(endpointId: string) {
  if (endpointId === FAL_IMAGE_EDIT_ENDPOINT) {
    return FAL_IMAGE_ENDPOINT;
  }

  if (endpointId === FAL_VIDEO_ENDPOINT) {
    return FAL_VIDEO_QUEUE_ENDPOINT;
  }

  return endpointId;
}

function normalizeImageResponse(
  requestId: string,
  prompt: string,
  settings: ImageGenerationSettings,
  data: unknown
): GenerationJobResponse {
  const images = normalizeOutputs((data as { images?: FalFileOutput[] })?.images);

  return {
    jobId: requestId,
    status: "completed",
    type: "image",
    outputs: images,
    prompt,
    providerModel: settings.isEdit ? FAL_IMAGE_EDIT_ENDPOINT : FAL_IMAGE_ENDPOINT,
    requestSettings: settings,
    createdAt: new Date().toISOString(),
  };
}

function normalizeVideoResponse(
  requestId: string,
  prompt: string,
  settings: VideoGenerationSettings,
  data: unknown
): GenerationJobResponse {
  const outputs = normalizeOutputs(
    (data as { video?: FalFileOutput })?.video
      ? [(data as { video: FalFileOutput }).video]
      : undefined
  );

  return {
    jobId: requestId,
    status: "completed",
    type: "video",
    outputs,
    prompt,
    providerModel: FAL_VIDEO_ENDPOINT,
    requestSettings: settings,
    createdAt: new Date().toISOString(),
  };
}

function createImageSettings(input: ImageGenerationInput): ImageGenerationSettings {
  return {
    aspectRatio: input.aspectRatio,
    model: "nano-banana-2",
    count: input.count,
    resolution: input.resolution,
    isEdit: input.attachments.length > 0,
    attachmentCount: input.attachments.length,
  };
}

function createVideoSettings(
  input: VideoGenerationInput,
  firstFrameUrl: string,
  lastFrameUrl?: string
): VideoGenerationSettings {
  return {
    aspectRatio: input.aspectRatio,
    duration: input.duration,
    model: "kling-3",
    audio: input.audio,
    firstFrame: firstFrameUrl,
    lastFrame: lastFrameUrl,
  };
}

function resolutionToFalValue(resolution: ImageResolution) {
  switch (resolution) {
    case "1024":
      return "1K";
    case "2048":
      return "2K";
    case "4096":
      return "4K";
    default:
      return "2K";
  }
}

export async function submitImageGeneration(input: ImageGenerationInput) {
  ensureFalConfigured();

  const attachmentUrls = await Promise.all(
    input.attachments.map((attachment) => fal.storage.upload(attachment))
  );

  const settings = createImageSettings(input);
  const endpointId =
    attachmentUrls.length > 0 ? FAL_IMAGE_EDIT_ENDPOINT : FAL_IMAGE_ENDPOINT;

  const queue = await fal.queue.submit(endpointId, {
    input: {
      prompt: input.prompt,
      aspect_ratio: input.aspectRatio,
      num_images: input.count,
      resolution: resolutionToFalValue(input.resolution),
      ...(attachmentUrls.length > 0 ? { image_urls: attachmentUrls } : {}),
    },
  });

  return {
    requestId: queue.request_id,
    endpointId,
    response: {
      jobId: queue.request_id,
      status: "queued" as const,
      type: "image" as const,
      outputs: [],
      prompt: input.prompt,
      providerModel: endpointId,
      requestSettings: settings,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function submitVideoGeneration(input: VideoGenerationInput) {
  ensureFalConfigured();

  const startImageUrl = await fal.storage.upload(input.firstFrame);
  const endImageUrl = input.lastFrame
    ? await fal.storage.upload(input.lastFrame)
    : undefined;
  const settings = createVideoSettings(input, startImageUrl, endImageUrl);

  const queue = await fal.queue.submit(FAL_VIDEO_ENDPOINT, {
    input: {
      prompt: input.prompt,
      start_image_url: startImageUrl,
      duration: String(input.duration),
      generate_audio: input.audio,
      aspect_ratio: input.aspectRatio,
      ...(endImageUrl ? { end_image_url: endImageUrl } : {}),
    },
  });

  return {
    requestId: queue.request_id,
    endpointId: FAL_VIDEO_ENDPOINT,
    response: {
      jobId: queue.request_id,
      status: "queued" as const,
      type: "video" as const,
      outputs: [],
      prompt: input.prompt,
      providerModel: FAL_VIDEO_ENDPOINT,
      requestSettings: settings,
      createdAt: new Date().toISOString(),
    },
  };
}

export async function getGenerationStatus(
  endpointId: string,
  requestId: string,
  prompt: string,
  type: "image" | "video",
  settings: ImageGenerationSettings | VideoGenerationSettings
): Promise<GenerationJobResponse> {
  ensureFalConfigured();
  const queueEndpointId = toQueueEndpointId(endpointId);

  const status = await fal.queue.status(queueEndpointId, {
    requestId,
    logs: true,
  });

  if (status.status !== "COMPLETED") {
    return {
      jobId: requestId,
      status: mapProviderStatus(status.status),
      type,
      outputs: [],
      prompt,
      providerModel: endpointId,
      requestSettings: settings,
      createdAt: new Date().toISOString(),
    };
  }

  const result = await fal.queue.result(queueEndpointId, {
    requestId,
  });

  if (type === "image") {
    return normalizeImageResponse(
      result.requestId,
      prompt,
      settings as ImageGenerationSettings,
      result.data
    );
  }

  return normalizeVideoResponse(
    result.requestId,
    prompt,
    settings as VideoGenerationSettings,
    result.data
  );
}

export function createGenerationErrorResponse(
  type: "image" | "video",
  prompt: string,
  providerModel: string,
  requestSettings: ImageGenerationSettings | VideoGenerationSettings,
  error: unknown,
  requestId = crypto.randomUUID()
): GenerationJobResponse {
  return {
    jobId: requestId,
    status: "failed",
    type,
    outputs: [],
    prompt,
    providerModel,
    requestSettings,
    createdAt: new Date().toISOString(),
    error: error instanceof Error ? error.message : "Generation failed.",
  };
}

export const FAL_STUDIO_ENDPOINTS = {
  image: FAL_IMAGE_ENDPOINT,
  imageEdit: FAL_IMAGE_EDIT_ENDPOINT,
  video: FAL_VIDEO_ENDPOINT,
} as const;
