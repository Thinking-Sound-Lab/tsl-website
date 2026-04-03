"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  PaintBrush01Icon,
  AspectRatioIcon,
  Image01Icon,
  PlusSignCircleIcon,
  MinusSignCircleIcon,
} from "@hugeicons/core-free-icons";
import { useStudioStore } from "@/store/useStudioStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { AspectRatio, ImageStyle } from "@/types/studio";

const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: "1:1", label: "1:1 Square" },
  { value: "16:9", label: "16:9 Landscape" },
  { value: "9:16", label: "9:16 Portrait" },
  { value: "4:3", label: "4:3 Standard" },
  { value: "3:4", label: "3:4 Portrait" },
];

const STYLES: { value: ImageStyle; label: string }[] = [
  { value: "photorealistic", label: "Photorealistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime" },
  { value: "digital-art", label: "Digital Art" },
  { value: "oil-painting", label: "Oil Painting" },
  { value: "watercolor", label: "Watercolor" },
];

const RESOLUTIONS = [
  { value: "1024", label: "1K" },
  { value: "2048", label: "2K" },
  { value: "4096", label: "4K" },
];

export function ImageSettings() {
  const {
    imageAspectRatio,
    setImageAspectRatio,
    imageStyle,
    setImageStyle,
    imageCount,
    setImageCount,
    imageResolution,
    setImageResolution,
  } = useStudioStore();

  return (
    <div className="flex items-center gap-2">
      {/* Style */}
      <Select value={imageStyle} onValueChange={(v) => setImageStyle(v as ImageStyle)}>
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-full px-2.5">
          <HugeiconsIcon icon={PaintBrush01Icon} size={14} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {STYLES.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Count — plus/minus */}
      <div className="flex items-center gap-1 h-7 border border-border/40 rounded-full px-1.5">
        <HugeiconsIcon icon={Image01Icon} size={14} className="text-foreground/50" />
        <button
          onClick={() => setImageCount(Math.max(1, imageCount - 1))}
          disabled={imageCount <= 1}
          className="text-foreground/50 hover:text-foreground/80 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          <HugeiconsIcon icon={MinusSignCircleIcon} size={14} />
        </button>
        <span className="text-xs font-medium text-foreground/70 w-4 text-center">{imageCount}</span>
        <button
          onClick={() => setImageCount(Math.min(4, imageCount + 1))}
          disabled={imageCount >= 4}
          className="text-foreground/50 hover:text-foreground/80 disabled:opacity-30 cursor-pointer disabled:cursor-not-allowed transition-colors"
        >
          <HugeiconsIcon icon={PlusSignCircleIcon} size={14} />
        </button>
      </div>

      {/* Aspect Ratio */}
      <Select value={imageAspectRatio} onValueChange={(v) => setImageAspectRatio(v as AspectRatio)}>
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-full px-2.5">
          <HugeiconsIcon icon={AspectRatioIcon} size={14} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ASPECT_RATIOS.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Resolution */}
      <Select value={imageResolution} onValueChange={setImageResolution}>
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-full px-2.5">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {RESOLUTIONS.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
