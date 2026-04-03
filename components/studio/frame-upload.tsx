"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FrameUploadProps {
  label: string;
  preview: string | null;
  onUpload: (file: File | null) => void;
}

export function FrameUpload({ label, preview, onUpload }: FrameUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex items-center gap-2">
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
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors border cursor-pointer",
          preview
            ? "border-[#F54E00]/30 bg-[#F54E00]/5 text-[#F54E00]"
            : "border-border/50 bg-secondary/40 text-foreground/60 hover:text-foreground/80"
        )}
      >
        {preview ? (
          <div className="relative h-5 w-5 rounded overflow-hidden">
            <Image src={preview} alt={label} fill className="object-cover" unoptimized />
          </div>
        ) : (
          <ImagePlus className="h-3.5 w-3.5" />
        )}
        <span className="hidden sm:inline">{label}</span>
      </button>
      {preview && (
        <button
          onClick={() => onUpload(null)}
          className="p-0.5 rounded-full text-foreground/40 hover:text-foreground/70 transition-colors cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}
