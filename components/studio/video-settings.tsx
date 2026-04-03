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
    <div className="flex items-center gap-2">
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
        <SelectTrigger className="h-7 w-auto gap-1 text-xs bg-secondary/60 border-border/40 rounded-full px-3">
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
      <div className="flex items-center gap-0.5 bg-secondary/60 border border-border/40 rounded-full px-1 h-7">
        {ASPECT_RATIOS.map((ratio) => (
          <button
            key={ratio}
            onClick={() => setVideoAspectRatio(ratio)}
            className={cn(
              "px-2 h-5 flex items-center justify-center rounded-full text-xs font-medium transition-colors cursor-pointer",
              videoAspectRatio === ratio
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
