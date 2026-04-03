"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  AspectRatioIcon,
  Clock01Icon,
  VolumeHighIcon,
  VolumeOffIcon,
  ArtificialIntelligence01Icon,
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

const ASPECT_RATIOS: AspectRatio[] = ["1:1", "16:9", "9:16"];

const DURATIONS = [5, 10, 15, 30];

const VIDEO_MODELS = [
  { value: "invook-v2", label: "Invook V2" },
  { value: "invook-v1", label: "Invook V1" },
  { value: "stable-diffusion", label: "Stable Diffusion" },
];

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
    aiModel,
    setAIModel,
  } = useStudioStore();

  return (
    <div className="flex items-center gap-2">
      {/* AI Model */}
      <Select value={aiModel} onValueChange={(v) => setAIModel(v as typeof aiModel)}>
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-md px-2.5">
          <HugeiconsIcon icon={ArtificialIntelligence01Icon} size={14} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {VIDEO_MODELS.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

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
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-md px-2.5">
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
        <SelectTrigger className="h-7 w-auto gap-1.5 text-xs bg-transparent border-border/40 rounded-md px-2.5">
          <HugeiconsIcon icon={AspectRatioIcon} size={14} />
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {ASPECT_RATIOS.map((ratio) => (
            <SelectItem key={ratio} value={ratio} className="text-xs">
              {ratio}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Audio toggle */}
      <button
        onClick={() => setVideoAudio(!videoAudio)}
        className={cn(
          "h-7 flex items-center gap-1.5 px-2.5 rounded-md border text-xs font-medium transition-colors cursor-pointer",
          videoAudio
            ? "border-foreground/20 bg-foreground/5 text-foreground"
            : "border-border/40 text-foreground/50 hover:text-foreground/70"
        )}
      >
        <HugeiconsIcon icon={videoAudio ? VolumeHighIcon : VolumeOffIcon} size={14} />
        <span>Audio</span>
      </button>
    </div>
  );
}
