"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Image01Icon, Film01Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { useStudioStore } from "@/store/useStudioStore";
import { cn } from "@/lib/utils";
import type { StudioMode } from "@/types/studio";

const modes: { value: StudioMode; icon: IconSvgElement; label: string }[] = [
  { value: "image", icon: Image01Icon, label: "Image" },
  { value: "video", icon: Film01Icon, label: "Video" },
];

export function ModeSwitcher() {
  const { mode, setMode } = useStudioStore();

  return (
    <div className="flex flex-col gap-1.5 self-stretch justify-end pb-1 bg-secondary/30 rounded-2xl p-1.5">
      {modes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={cn(
            "flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-[10px] font-medium transition-colors cursor-pointer w-14",
            mode === value
              ? "bg-secondary/80 text-foreground shadow-sm"
              : "text-foreground/40 hover:text-foreground/60"
          )}
        >
          <HugeiconsIcon icon={icon} size={16} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
