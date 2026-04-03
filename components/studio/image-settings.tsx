"use client";

import { useStudioStore } from "@/store/useStudioStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { AspectRatio, ImageStyle } from "@/types/studio";

const ASPECT_RATIOS: AspectRatio[] = ["1:1", "16:9", "9:16", "4:3"];

const STYLES: { value: ImageStyle; label: string }[] = [
  { value: "photorealistic", label: "Photorealistic" },
  { value: "cinematic", label: "Cinematic" },
  { value: "anime", label: "Anime" },
  { value: "digital-art", label: "Digital Art" },
  { value: "oil-painting", label: "Oil Painting" },
  { value: "watercolor", label: "Watercolor" },
];

const COUNTS = [1, 2, 3, 4];

export function ImageSettings() {
  const {
    imageAspectRatio,
    setImageAspectRatio,
    imageStyle,
    setImageStyle,
    imageCount,
    setImageCount,
  } = useStudioStore();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Aspect Ratio */}
      <div className="flex items-center gap-1 bg-secondary/40 rounded-lg p-1">
        {ASPECT_RATIOS.map((ratio) => (
          <button
            key={ratio}
            onClick={() => setImageAspectRatio(ratio)}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
              imageAspectRatio === ratio
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            )}
          >
            {ratio}
          </button>
        ))}
      </div>

      {/* Style */}
      <Select value={imageStyle} onValueChange={(v) => setImageStyle(v as ImageStyle)}>
        <SelectTrigger className="h-7 w-[130px] text-xs bg-secondary/40 border-border/50 rounded-lg">
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

      {/* Count */}
      <div className="flex items-center gap-1 bg-secondary/40 rounded-lg p-1">
        {COUNTS.map((count) => (
          <button
            key={count}
            onClick={() => setImageCount(count)}
            className={cn(
              "w-7 h-6 flex items-center justify-center rounded-md text-xs font-medium transition-colors cursor-pointer",
              imageCount === count
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            )}
          >
            {count}
          </button>
        ))}
      </div>
    </div>
  );
}
