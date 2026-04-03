export type StudioMode = "image" | "video";

export type AspectRatio = "1:1" | "16:9" | "9:16" | "4:3" | "3:4";

export type ImageStyle =
  | "photorealistic"
  | "cinematic"
  | "anime"
  | "digital-art"
  | "oil-painting"
  | "watercolor";

export interface ImageGenerationSettings {
  aspectRatio: AspectRatio;
  style: ImageStyle;
  count: number;
}

export interface VideoGenerationSettings {
  aspectRatio: AspectRatio;
  duration: number;
  firstFrame?: string;
  lastFrame?: string;
}

export interface GenerationResult {
  id: string;
  type: StudioMode;
  urls: string[];
  prompt: string;
  settings: ImageGenerationSettings | VideoGenerationSettings;
  createdAt: string;
}
