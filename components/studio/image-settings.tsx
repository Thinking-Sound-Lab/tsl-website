"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArtificialIntelligence01Icon,
  AspectRatioIcon,
  MinusSignCircleIcon,
  PlusSignCircleIcon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { useStudioStore } from "@/store/useStudioStore";
import { SettingPicker, type SettingPickerOption } from "./setting-picker";
import type {
  ImageAIModel,
  ImageAspectRatio,
  ImageResolution,
} from "@/types/studio";

const ASPECT_RATIOS: SettingPickerOption[] = [
  {
    value: "auto",
    label: "Auto",
    description: "Let the model choose the best framing for your prompt.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "1:1",
    label: "1:1",
    description: "Square framing for covers, tiles, and balanced compositions.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "16:9",
    label: "16:9",
    description: "Wide cinematic framing for landscapes and scene building.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "9:16",
    label: "9:16",
    description: "Vertical framing for phone-first visuals and stories.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "4:3",
    label: "4:3",
    description: "Classic frame with more height than widescreen.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "3:4",
    label: "3:4",
    description: "Portrait-oriented frame with a print-like feel.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
];

const IMAGE_MODELS: SettingPickerOption[] = [
  {
    value: "nano-banana-2",
    label: "Nano Banana 2",
    description: "Fast image generation with clean general-purpose results.",
    icon: <HugeiconsIcon icon={ArtificialIntelligence01Icon} size={13} />,
  },
];

const RESOLUTIONS: SettingPickerOption[] = [
  {
    value: "1024",
    label: "1K",
    description: "Fast. Quick generation with good resolution.",
    icon: <HugeiconsIcon icon={SparklesIcon} size={13} />,
  },
  {
    value: "2048",
    label: "2K",
    description: "Balanced. Recommended for most use cases.",
    icon: <HugeiconsIcon icon={SparklesIcon} size={13} />,
  },
  {
    value: "4096",
    label: "4K",
    description: "Ultra. Highest detail with longer processing.",
    icon: <HugeiconsIcon icon={SparklesIcon} size={13} />,
  },
];

export function ImageSettings() {
  const {
    imageAspectRatio,
    setImageAspectRatio,
    imageModel,
    setImageModel,
    imageCount,
    setImageCount,
    imageResolution,
    setImageResolution,
  } = useStudioStore();

  return (
    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 md:flex-nowrap">
      <SettingPicker
        label="model"
        value={imageModel}
        options={IMAGE_MODELS}
        onChange={(value) => setImageModel(value as ImageAIModel)}
        className="w-[7.1rem] md:w-[9.75rem]"
      />

      <div className="flex h-6.5 shrink-0 items-center gap-1 rounded-md bg-foreground/10 px-2 text-foreground md:h-7 md:px-2.5">
        <button
          onClick={() => setImageCount(Math.max(1, imageCount - 1))}
          disabled={imageCount <= 1}
          className="cursor-pointer text-foreground/50 transition-colors hover:text-foreground/80 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <HugeiconsIcon icon={MinusSignCircleIcon} size={13} />
        </button>
        <span className="w-4 text-center text-[11px] font-medium text-foreground md:text-xs">
          {imageCount}
        </span>
        <button
          onClick={() => setImageCount(Math.min(4, imageCount + 1))}
          disabled={imageCount >= 4}
          className="cursor-pointer text-foreground/50 transition-colors hover:text-foreground/80 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={13} />
        </button>
      </div>

      <SettingPicker
        label="aspect ratio"
        value={imageAspectRatio}
        options={ASPECT_RATIOS}
        onChange={(value) => setImageAspectRatio(value as ImageAspectRatio)}
      />

      <SettingPicker
        label="resolution"
        value={imageResolution}
        options={RESOLUTIONS}
        onChange={(value) => setImageResolution(value as ImageResolution)}
      />
    </div>
  );
}
