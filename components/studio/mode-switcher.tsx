"use client";

import { ImageIcon, Video } from "lucide-react";
import { useStudioStore } from "@/store/useStudioStore";
import { cn } from "@/lib/utils";
import type { StudioMode } from "@/types/studio";

const modes: { value: StudioMode; icon: typeof ImageIcon; label: string }[] = [
  { value: "image", icon: ImageIcon, label: "Image" },
  { value: "video", icon: Video, label: "Video" },
];

export function ModeSwitcher() {
  const { mode, setMode } = useStudioStore();

  return (
    <div className="flex flex-col gap-1.5 self-stretch justify-end pb-1">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={cn(
            "flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl text-[10px] font-medium transition-colors cursor-pointer w-14",
            mode === value
              ? "bg-secondary/80 text-foreground border border-border/50"
              : "text-foreground/40 hover:text-foreground/60"
          )}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
