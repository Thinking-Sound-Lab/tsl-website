"use client";

import { useRef, useCallback, useState, KeyboardEvent, ReactNode, PointerEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { PlusSignCircleIcon, Cancel01Icon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import Image from "next/image";
import { useStudioStore } from "@/store/useStudioStore";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  children?: ReactNode;
}

const MIN_HEIGHT = 140;
const MAX_HEIGHT = 400;
const DEFAULT_HEIGHT = 180;

export function PromptInput({ children }: PromptInputProps) {
  const { prompt, setPrompt, isGenerating, generate, attachments, addAttachment, removeAttachment } = useStudioStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(DEFAULT_HEIGHT);
  const dragStart = useRef<{ y: number; h: number } | null>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  const onPointerDown = useCallback((e: PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    dragStart.current = { y: e.clientY, h: height };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  }, [height]);

  const onPointerMove = useCallback((e: PointerEvent<HTMLDivElement>) => {
    if (!dragStart.current) return;
    const delta = dragStart.current.y - e.clientY;
    const newH = Math.min(MAX_HEIGHT, Math.max(MIN_HEIGHT, dragStart.current.h + delta));
    setHeight(newH);
  }, []);

  const onPointerUp = useCallback(() => {
    dragStart.current = null;
  }, []);

  const canSubmit = prompt.trim().length > 0 && !isGenerating;

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col bg-secondary/60 rounded-2xl border border-border/50 overflow-hidden"
      style={{ height }}
    >
      {/* Resize handle */}
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        className="flex items-center justify-center py-1.5 cursor-ns-resize shrink-0 group"
      >
        <div className="w-10 h-1 rounded-full bg-foreground/10 group-hover:bg-foreground/25 transition-colors" />
      </div>

      {/* Attachments row at top */}
      {attachments.length > 0 && (
        <div className="flex items-center gap-2 px-3 pb-2 shrink-0 overflow-x-auto no-scrollbar">
          {attachments.map((att, i) => (
            <div key={i} className="relative group/att shrink-0">
              <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border/30">
                <Image src={att.preview} alt={`Attachment ${i + 1}`} fill className="object-cover" unoptimized />
              </div>
              <button
                onClick={() => removeAttachment(i)}
                className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-foreground/80 text-background opacity-0 group-hover/att:opacity-100 transition-opacity cursor-pointer"
              >
                <HugeiconsIcon icon={Cancel01Icon} size={10} />
              </button>
            </div>
          ))}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="h-12 w-12 flex items-center justify-center rounded-lg border border-dashed border-border/40 text-foreground/30 hover:text-foreground/50 hover:border-border/60 transition-colors cursor-pointer shrink-0"
          >
            <HugeiconsIcon icon={PlusSignCircleIcon} size={18} />
          </button>
        </div>
      )}

      {/* Hidden file input for attachments */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(e) => {
          const files = e.target.files;
          if (files) Array.from(files).forEach(addAttachment);
          e.target.value = "";
        }}
      />

      {/* Textarea */}
      <div className="flex-1 px-4 overflow-hidden">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe your scene..."
          className="w-full h-full resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/30"
        />
      </div>

      {/* Bottom: settings left, generate button right */}
      <div className="flex items-end justify-between gap-3 px-3 pb-3 pt-1 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar flex-1 min-w-0">
          {/* Add image button when no attachments */}
          {attachments.length === 0 && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="h-7 w-7 flex items-center justify-center rounded-md border border-border/40 text-foreground/40 hover:text-foreground/60 hover:border-border/60 transition-colors cursor-pointer shrink-0"
            >
              <HugeiconsIcon icon={PlusSignCircleIcon} size={14} />
            </button>
          )}
          {children}
        </div>

        {/* Generate button — bottom right, half the prompt bar height */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={generate}
          disabled={!canSubmit}
          style={{ height: DEFAULT_HEIGHT / 2 }}
          className="w-24 flex items-center justify-center bg-[#F54E00] hover:bg-[#e04500] text-white text-sm font-semibold shrink-0 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-xl"
        >
          Generate
        </motion.button>
      </div>
    </div>
  );
}
