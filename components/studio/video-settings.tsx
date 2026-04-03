"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  AspectRatioIcon,
  Clock01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
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

const ASPECT_RATIOS: { value: AspectRatio; label: string }[] = [
  { value: "1:1", label: "1:1 Square" },
  { value: "16:9", label: "16:9 Landscape" },
  { value: "9:16", label: "9:16 Portrait" },
];

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
    videoAudio,
    setVideoAudio,
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
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-full px-2.5">
          <HugeiconsIcon icon={Clock01Icon} size={14} />
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
      <Select value={videoAspectRatio} onValueChange={(v) => setVideoAspectRatio(v as AspectRatio)}>
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

      {/* Audio toggle */}
      <button
        onClick={() => setVideoAudio(!videoAudio)}
        className={cn(
          "h-7 flex items-center gap-1.5 px-2.5 rounded-full border text-xs font-medium transition-colors cursor-pointer",
          videoAudio
            ? "border-[#F54E00]/30 bg-[#F54E00]/5 text-[#F54E00]"
            : "border-border/40 text-foreground/50 hover:text-foreground/70"
        )}
      >
        <HugeiconsIcon icon={videoAudio ? VolumeHighIcon : VolumeOffIcon} size={14} />
        <span>Audio</span>
      </button>
    </div>
  );
}
