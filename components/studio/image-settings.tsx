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
    <div className="flex items-center gap-2">
      {/* Style */}
      <Select value={imageStyle} onValueChange={(v) => setImageStyle(v as ImageStyle)}>
        <SelectTrigger className="h-7 w-auto gap-1 text-xs bg-secondary/60 border-border/40 rounded-full px-3">
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
      <div className="flex items-center gap-0.5 bg-secondary/60 border border-border/40 rounded-full px-1 h-7">
        {COUNTS.map((count) => (
          <button
            key={count}
            onClick={() => setImageCount(count)}
            className={cn(
              "w-6 h-5 flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer",
              imageCount === count
                ? "bg-foreground/10 text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            )}
          >
            {count}
          </button>
        ))}
      </div>

      {/* Aspect Ratio */}
      <div className="flex items-center gap-0.5 bg-secondary/60 border border-border/40 rounded-full px-1 h-7">
        {ASPECT_RATIOS.map((ratio) => (
          <button
            key={ratio}
            onClick={() => setImageAspectRatio(ratio)}
            className={cn(
              "px-2 h-5 flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer",
              imageAspectRatio === ratio
                ? "bg-foreground/10 text-foreground"
                : "text-foreground/40 hover:text-foreground/60"
            )}
          >
            {ratio}
          </button>
        ))}
      </div>
    </div>
  );
}
