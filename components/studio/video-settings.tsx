"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArtificialIntelligence01Icon,
  AspectRatioIcon,
  VolumeHighIcon,
  VolumeOffIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";
import { useStudioStore } from "@/store/useStudioStore";
import { DurationPicker } from "./duration-picker";
import { SettingPicker, type SettingPickerOption } from "./setting-picker";
import type { VideoAIModel, VideoAspectRatio } from "@/types/studio";

const VIDEO_MODELS: SettingPickerOption[] = [
  {
    value: "kling-3",
    label: "Kling 3",
    description: "Balanced video generation for cinematic motion prompts.",
    icon: <HugeiconsIcon icon={ArtificialIntelligence01Icon} size={13} />,
  },
];

const ASPECT_RATIOS: SettingPickerOption[] = [
  {
    value: "16:9",
    label: "16:9",
    description: "Wide cinematic framing for landscape-first motion.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "9:16",
    label: "9:16",
    description: "Vertical framing for reels, stories, and mobile video.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
  {
    value: "1:1",
    label: "1:1",
    description: "Square framing for balanced motion compositions.",
    icon: <HugeiconsIcon icon={AspectRatioIcon} size={13} />,
  },
];

const settingChipClass =
  "h-6.5 rounded-md border-transparent bg-foreground/10 px-2 text-[11px] font-medium text-foreground shadow-none outline-none focus:border-transparent focus:outline-none focus:ring-0 focus-visible:border-transparent focus-visible:outline-none focus-visible:ring-0 md:h-7 md:px-2.5 md:text-xs";

export function VideoSettings() {
  const {
    videoAspectRatio,
    setVideoAspectRatio,
    videoDuration,
    setVideoDuration,
    videoAudio,
    setVideoAudio,
    videoModel,
    setVideoModel,
  } = useStudioStore();

  return (
    <div className="flex flex-wrap items-center gap-1.5 md:gap-2 md:flex-nowrap">
      <SettingPicker
        label="model"
        value={videoModel}
        options={VIDEO_MODELS}
        onChange={(value) => setVideoModel(value as VideoAIModel)}
        className="w-[7.1rem] md:w-[9.75rem]"
      />

      <DurationPicker
        value={videoDuration}
        onChange={setVideoDuration}
      />

      <SettingPicker
        label="aspect ratio"
        value={videoAspectRatio}
        options={ASPECT_RATIOS}
        onChange={(value) => setVideoAspectRatio(value as VideoAspectRatio)}
      />

      <button
        onClick={() => setVideoAudio(!videoAudio)}
        className={cn(
          "flex shrink-0 items-center gap-1 transition-colors cursor-pointer md:gap-1.5",
          settingChipClass,
          videoAudio
            ? "bg-foreground/10 text-foreground"
            : "bg-foreground/10 text-foreground/50 hover:text-foreground/70"
        )}
      >
        <HugeiconsIcon
          icon={videoAudio ? VolumeHighIcon : VolumeOffIcon}
          size={13}
        />
        <span>Audio</span>
      </button>
    </div>
  );
}
