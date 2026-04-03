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
    <div className="flex flex-row md:flex-col gap-1 bg-secondary/60 rounded-xl p-1">
      {modes.map(({ value, icon: Icon, label }) => (
        <button
          key={value}
          onClick={() => setMode(value)}
          className={cn(
            "flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer",
            mode === value
              ? "bg-background text-foreground shadow-sm"
              : "text-foreground/50 hover:text-foreground/70"
          )}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden sm:inline">{label}</span>
        </button>
      ))}
    </div>
  );
}
