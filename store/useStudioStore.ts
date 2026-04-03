import { create } from "zustand";
import type {
  ImageAspectRatio,
  ImageAIModel,
  ImageResolution,
  StudioCanvasAsset,
  StudioGalleryViewerState,
  StudioMode,
  VideoAspectRatio,
  VideoAIModel,
} from "@/types/studio";

interface StudioState {
  mode: StudioMode;
  setMode: (mode: StudioMode) => void;

  prompt: string;
  setPrompt: (prompt: string) => void;

  attachments: { file: File; preview: string }[];
  addAttachment: (file: File) => void;
  removeAttachment: (index: number) => void;
  clearAttachments: () => void;

  imageAspectRatio: ImageAspectRatio;
  imageModel: ImageAIModel;
  imageCount: number;
  imageResolution: ImageResolution;
  setImageAspectRatio: (value: ImageAspectRatio) => void;
  setImageModel: (value: ImageAIModel) => void;
  setImageCount: (value: number) => void;
  setImageResolution: (value: ImageResolution) => void;

  videoAspectRatio: VideoAspectRatio;
  videoDuration: number;
  videoModel: VideoAIModel;
  firstFrame: File | null;
  firstFramePreview: string | null;
  lastFrame: File | null;
  lastFramePreview: string | null;
  videoAudio: boolean;
  setVideoAspectRatio: (value: VideoAspectRatio) => void;
  setVideoDuration: (value: number) => void;
  setVideoModel: (value: VideoAIModel) => void;
  setFirstFrame: (file: File | null) => void;
  setLastFrame: (file: File | null) => void;
  setVideoAudio: (value: boolean) => void;

  canvasAssets: StudioCanvasAsset[];
  appendCanvasAssets: (assets: StudioCanvasAsset[]) => void;

  selectedAssetId: StudioGalleryViewerState["selectedAssetId"];
  openViewer: (assetId: string) => void;
  closeViewer: () => void;
  goToNext: () => void;
  goToPrevious: () => void;
}

function revokePreview(preview: string | null) {
  if (preview) {
    URL.revokeObjectURL(preview);
  }
}

export const useStudioStore = create<StudioState>((set, get) => ({
  mode: "image",
  setMode: (mode) => set({ mode }),

  prompt: "",
  setPrompt: (prompt) => set({ prompt }),

  attachments: [],
  addAttachment: (file) => {
    const preview = URL.createObjectURL(file);
    set((state) => ({
      attachments: [...state.attachments, { file, preview }],
    }));
  },
  removeAttachment: (index) => {
    const attachments = get().attachments;
    const removed = attachments[index];

    revokePreview(removed?.preview ?? null);

    set({
      attachments: attachments.filter((_, currentIndex) => currentIndex !== index),
    });
  },
  clearAttachments: () => {
    const attachments = get().attachments;
    attachments.forEach((attachment) => revokePreview(attachment.preview));
    set({ attachments: [] });
  },

  imageAspectRatio: "1:1",
  imageModel: "nano-banana-2",
  imageCount: 1,
  imageResolution: "2048",
  setImageAspectRatio: (value) => set({ imageAspectRatio: value }),
  setImageModel: (value) => set({ imageModel: value }),
  setImageCount: (value) => set({ imageCount: value }),
  setImageResolution: (value) => set({ imageResolution: value }),

  videoAspectRatio: "16:9",
  videoDuration: 5,
  videoModel: "kling-3",
  firstFrame: null,
  firstFramePreview: null,
  lastFrame: null,
  lastFramePreview: null,
  videoAudio: true,
  setVideoAspectRatio: (value) => set({ videoAspectRatio: value }),
  setVideoDuration: (value) => set({ videoDuration: value }),
  setVideoModel: (value) => set({ videoModel: value }),
  setVideoAudio: (value) => set({ videoAudio: value }),
  setFirstFrame: (file) => {
    revokePreview(get().firstFramePreview);
    set({
      firstFrame: file,
      firstFramePreview: file ? URL.createObjectURL(file) : null,
    });
  },
  setLastFrame: (file) => {
    revokePreview(get().lastFramePreview);
    set({
      lastFrame: file,
      lastFramePreview: file ? URL.createObjectURL(file) : null,
    });
  },

  canvasAssets: [],
  appendCanvasAssets: (assets) =>
    set((state) => ({
      canvasAssets: [...state.canvasAssets, ...assets],
    })),

  selectedAssetId: null,
  openViewer: (assetId) => set({ selectedAssetId: assetId }),
  closeViewer: () => set({ selectedAssetId: null }),
  goToNext: () =>
    set((state) => {
      if (!state.selectedAssetId) {
        return state;
      }

      const currentIndex = state.canvasAssets.findIndex(
        (asset) => asset.id === state.selectedAssetId
      );

      if (
        currentIndex < 0 ||
        currentIndex >= state.canvasAssets.length - 1
      ) {
        return state;
      }

      return {
        selectedAssetId: state.canvasAssets[currentIndex + 1].id,
      };
    }),
  goToPrevious: () =>
    set((state) => {
      if (!state.selectedAssetId) {
        return state;
      }

      const currentIndex = state.canvasAssets.findIndex(
        (asset) => asset.id === state.selectedAssetId
      );

      if (currentIndex <= 0) {
        return state;
      }

      return {
        selectedAssetId: state.canvasAssets[currentIndex - 1].id,
      };
    }),
}));
