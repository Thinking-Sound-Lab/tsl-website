"use client";

import { useRef, useState, type DragEvent } from "react";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import {
  draggedStudioAssetToFile,
  hasDraggedStudioAsset,
  readDraggedStudioAsset,
} from "@/lib/studio-drag";
import { cn } from "@/lib/utils";

interface FrameUploadProps {
  label: string;
  preview: string | null;
  onUpload: (file: File | null) => void;
  compact?: boolean;
  className?: string;
}

export function FrameUpload({
  label,
  preview,
  onUpload,
  compact = false,
  className,
}: FrameUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDropTarget, setIsDropTarget] = useState(false);
  const compactLabel = label.toUpperCase().replace(" ", "\n");
  const mobileCompactLabel = label;

  const handleDrop = async (event: DragEvent<HTMLButtonElement>) => {
    const directFile = Array.from(event.dataTransfer.files).find((file) =>
      file.type.startsWith("image/")
    );

    if (directFile) {
      onUpload(directFile);
      return;
    }

    const asset = readDraggedStudioAsset(event.dataTransfer);

    if (!asset) {
      return;
    }

    const file = await draggedStudioAssetToFile(asset);

    if (file.type.startsWith("image/")) {
      onUpload(file);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-1",
        compact && "relative",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0] ?? null;
          onUpload(file);
          e.target.value = "";
        }}
      />
      <button
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          if (
            event.dataTransfer.files.length > 0 ||
            hasDraggedStudioAsset(event.dataTransfer)
          ) {
            event.preventDefault();
            event.dataTransfer.dropEffect = "copy";
            setIsDropTarget(true);
          }
        }}
        onDragLeave={() => setIsDropTarget(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDropTarget(false);
          void handleDrop(event);
        }}
        className={cn(
          "flex items-center justify-center transition-colors cursor-pointer",
          compact
            ? "relative h-10 w-full min-w-0 rounded-xl border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0.03)_100%)] px-2 py-2 text-left text-white shadow-[0_14px_30px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.05)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.04)_100%)] md:h-[90px] md:w-[68px] md:min-w-0 md:flex-col md:items-start md:justify-between md:px-3 md:py-3"
            : "gap-1.5 h-7 px-3 text-xs font-medium",
          isDropTarget &&
            "ring-2 ring-[#F54E00]/70 ring-offset-2 ring-offset-background",
          !compact &&
            (preview
              ? "bg-[#F54E00]/10 text-[#F54E00]"
              : "bg-foreground/10 text-foreground/50 hover:text-foreground/70")
        )}
        title={`Upload ${label}`}
      >
        {preview ? (
          <div
            className={cn(
              "relative overflow-hidden",
              compact
                ? "absolute inset-0 rounded-xl"
                : "h-full w-full rounded-sm"
            )}
          >
            <Image src={preview} alt={label} fill className="object-cover" unoptimized />
            {compact ? (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            ) : null}
          </div>
        ) : compact ? (
          <>
            <div className="mr-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white/7 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:mr-0 md:h-7 md:w-7 md:rounded-lg">
              <Plus className="h-3.5 w-3.5 text-white/88 md:h-4 md:w-4" strokeWidth={1.9} />
            </div>
            <span className="truncate text-[9px] font-semibold leading-none tracking-[-0.03em] text-white/94 md:hidden">
              {mobileCompactLabel}
            </span>
            <span className="hidden whitespace-pre-line text-[11px] font-semibold leading-[1.02] tracking-[-0.03em] text-white/94 md:block">
              {compactLabel}
            </span>
          </>
        ) : (
          <>
            <Plus className="h-3 w-3" />
            <span>{label}</span>
          </>
        )}
        {preview && compact ? (
          <span className="relative z-10 mt-auto hidden whitespace-pre-line text-[11px] font-semibold leading-[1.02] tracking-[-0.03em] text-white md:block">
            {compactLabel}
          </span>
        ) : null}
      </button>
      {preview && (
        <button
          onClick={() => onUpload(null)}
          className={cn(
            "transition-colors cursor-pointer",
            compact
              ? "absolute right-1.5 top-1.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/45 text-white/88 backdrop-blur-sm hover:bg-black/60"
              : "p-0.5 rounded-full text-foreground/40 hover:text-foreground/70"
          )}
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
