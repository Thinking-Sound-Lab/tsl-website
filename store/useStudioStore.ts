import { create } from "zustand";
import type {
  StudioMode,
  AspectRatio,
  ImageStyle,
  GenerationResult,
} from "@/types/studio";

interface StudioState {
  // Mode
  mode: StudioMode;
  setMode: (mode: StudioMode) => void;

  // Prompt
  prompt: string;
  setPrompt: (prompt: string) => void;

  // Image settings
  imageAspectRatio: AspectRatio;
  imageStyle: ImageStyle;
  imageCount: number;
  imageResolution: string;
  setImageAspectRatio: (v: AspectRatio) => void;
  setImageStyle: (v: ImageStyle) => void;
  setImageCount: (v: number) => void;
  setImageResolution: (v: string) => void;

  // Video settings
  videoAspectRatio: AspectRatio;
  videoDuration: number;
  firstFrame: File | null;
  firstFramePreview: string | null;
  lastFrame: File | null;
  lastFramePreview: string | null;
  videoAudio: boolean;
  setVideoAspectRatio: (v: AspectRatio) => void;
  setVideoDuration: (v: number) => void;
  setFirstFrame: (file: File | null) => void;
  setLastFrame: (file: File | null) => void;
  setVideoAudio: (v: boolean) => void;

  // Generation
  isGenerating: boolean;
  generationResult: GenerationResult | null;
  generate: () => void;
  clearResult: () => void;
}

const PLACEHOLDER_IMAGES = [
  "https://picsum.photos/seed/studio1/1024/1024",
  "https://picsum.photos/seed/studio2/1024/1024",
  "https://picsum.photos/seed/studio3/1024/1024",
  "https://picsum.photos/seed/studio4/1024/1024",
];

export const useStudioStore = create<StudioState>((set, get) => ({
  // Mode
  mode: "image",
  setMode: (mode) => set({ mode }),

  // Prompt
  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  // Image settings
  imageAspectRatio: "1:1",
  imageStyle: "photorealistic",
  imageCount: 1,
  imageResolution: "2048",
  setImageAspectRatio: (v) => set({ imageAspectRatio: v }),
  setImageStyle: (v) => set({ imageStyle: v }),
  setImageCount: (v) => set({ imageCount: v }),
  setImageResolution: (v) => set({ imageResolution: v }),

  // Video settings
  videoAspectRatio: "16:9",
  videoDuration: 5,
  firstFrame: null,
  firstFramePreview: null,
  lastFrame: null,
  lastFramePreview: null,
  videoAudio: true,
  setVideoAspectRatio: (v) => set({ videoAspectRatio: v }),
  setVideoDuration: (v) => set({ videoDuration: v }),
  setVideoAudio: (v) => set({ videoAudio: v }),
  setFirstFrame: (file) => {
    const prev = get().firstFramePreview;
    if (prev) URL.revokeObjectURL(prev);
    set({
      firstFrame: file,
      firstFramePreview: file ? URL.createObjectURL(file) : null,
    });
  },
  setLastFrame: (file) => {
    const prev = get().lastFramePreview;
    if (prev) URL.revokeObjectURL(prev);
    set({
      lastFrame: file,
      lastFramePreview: file ? URL.createObjectURL(file) : null,
    });
  },

  // Generation
  isGenerating: false,
  generationResult: null,
  generate: () => {
    const state = get();
    if (!state.prompt.trim() || state.isGenerating) return;

    set({ isGenerating: true, generationResult: null });

    const count = state.mode === "image" ? state.imageCount : 1;
    const urls = PLACEHOLDER_IMAGES.slice(0, count);

    setTimeout(() => {
      const result: GenerationResult = {
        id: crypto.randomUUID(),
        type: state.mode,
        urls,
        prompt: state.prompt,
        settings:
          state.mode === "image"
            ? {
                aspectRatio: state.imageAspectRatio,
                style: state.imageStyle,
                count: state.imageCount,
              }
            : {
                aspectRatio: state.videoAspectRatio,
                duration: state.videoDuration,
                firstFrame: state.firstFramePreview ?? undefined,
                lastFrame: state.lastFramePreview ?? undefined,
              },
        createdAt: new Date().toISOString(),
      };
      set({ isGenerating: false, generationResult: result });
    }, 3000);
  },
  clearResult: () => set({ generationResult: null }),
}));
