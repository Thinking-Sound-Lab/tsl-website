"use client";

import { useStudioStore } from "@/store/useStudioStore";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FrameUpload } from "./frame-upload";
import { cn } from "@/lib/utils";
import type { AspectRatio } from "@/types/studio";

const ASPECT_RATIOS: AspectRatio[] = ["1:1", "16:9", "9:16"];
const DURATIONS = [5, 10, 15, 30];

export function VideoSettings() {
  const {
    videoAspectRatio,
    setVideoAspectRatio,
    videoDuration,
    setVideoDuration,
    firstFramePreview,
    setFirstFrame,
    lastFramePreview,
    setLastFrame,
  } = useStudioStore();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* First Frame */}
      <FrameUpload
        label="First Frame"
        preview={firstFramePreview}
        onUpload={setFirstFrame}
      />

      {/* Last Frame */}
      <FrameUpload
        label="Last Frame"
        preview={lastFramePreview}
        onUpload={setLastFrame}
      />

      {/* Duration */}
      <Select
        value={String(videoDuration)}
        onValueChange={(v) => setVideoDuration(Number(v))}
      >
        <SelectTrigger className="h-7 w-[80px] text-xs bg-secondary/40 border-border/50 rounded-lg">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {DURATIONS.map((d) => (
            <SelectItem key={d} value={String(d)} className="text-xs">
              {d}s
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Aspect Ratio */}
      <div className="flex items-center gap-1 bg-secondary/40 rounded-lg p-1">
        {ASPECT_RATIOS.map((ratio) => (
          <button
            key={ratio}
            onClick={() => setVideoAspectRatio(ratio)}
            className={cn(
              "px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer",
              videoAspectRatio === ratio
                ? "bg-background text-foreground shadow-sm"
                : "text-foreground/50 hover:text-foreground/70"
            )}
          >
            {ratio}
          </button>
        ))}
      </div>
    </div>
  );
}
