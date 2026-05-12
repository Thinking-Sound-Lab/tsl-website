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

interface ModeSwitcherProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
}

export function ModeSwitcher({
  orientation = "vertical",
  className,
}: ModeSwitcherProps) {
  const { mode, setMode } = useStudioStore();
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      className={cn(
        "bg-secondary rounded-xl p-1",
        isHorizontal ? "flex items-center gap-1" : "flex flex-col gap-1 self-end",
        className
      )}
    >
      {modes.map(({ value, icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={cn(
            isHorizontal
              ? "flex items-center gap-2 rounded-lg px-3 py-2 text-xs"
              : "flex w-14 flex-col items-center gap-1 px-2 py-2 text-[10px]",
            "font-medium transition-colors cursor-pointer",
            mode === value
              ? "bg-foreground/10 border-border/40 rounded-md text-foreground shadow-sm"
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
