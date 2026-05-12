export type StudioMode = "image" | "video";

export type ImageAspectRatio =
  | "auto"
  | "1:1"
  | "16:9"
  | "9:16"
  | "4:3"
  | "3:4";

export type VideoAspectRatio = "1:1" | "16:9" | "9:16";

export type AspectRatio = ImageAspectRatio | VideoAspectRatio;

export type ImageAIModel = "nano-banana-2";
export type VideoAIModel = "kling-3";
export type AIModel = ImageAIModel | VideoAIModel;

export type ImageResolution = "1024" | "2048" | "4096";

export type GenerationStatus =
  | "idle"
  | "submitting"
  | "processing"
  | "success"
  | "error";

export type ProviderJobStatus = "queued" | "processing" | "completed" | "failed";

export interface GeneratedMediaOutput {
  url: string;
  contentType?: string;
  fileName?: string;
}

export interface ImageGenerationSettings {
  aspectRatio: ImageAspectRatio;
  model: ImageAIModel;
  count: number;
  resolution: ImageResolution;
  isEdit: boolean;
  attachmentCount: number;
}

export interface VideoGenerationSettings {
  aspectRatio: VideoAspectRatio;
  duration: number;
  model: VideoAIModel;
  audio: boolean;
  firstFrame?: string;
  lastFrame?: string;
}

export type GenerationSettings =
  | ImageGenerationSettings
  | VideoGenerationSettings;

export interface GenerationResult {
  jobId: string;
  status: "success";
  type: StudioMode;
  urls: string[];
  outputs: GeneratedMediaOutput[];
  prompt: string;
  providerModel: string;
  settings: GenerationSettings;
  createdAt: string;
}

export interface StudioCanvasAsset {
  id: string;
  jobId: string;
  outputIndex: number;
  type: StudioMode;
  url: string;
  prompt: string;
  providerModel: string;
  createdAt: string;
  contentType?: string;
  fileName?: string;
  aspectRatio?: AspectRatio;
}

export interface StudioGalleryViewerState {
  selectedAssetId: string | null;
}

export interface GenerationJobResponse {
  jobId: string;
  status: ProviderJobStatus;
  type: StudioMode;
  outputs: GeneratedMediaOutput[];
  prompt: string;
  providerModel: string;
  requestSettings: GenerationSettings;
  createdAt: string;
  error?: string;
}

export interface StudioGenerationState {
  status: GenerationStatus;
  isSubmitting: boolean;
  isProcessing: boolean;
  isGenerating: boolean;
  result: GenerationResult | null;
  error: string | null;
}
