"use client";

import { useRef, useCallback, useState, KeyboardEvent, ReactNode, PointerEvent } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SparklesIcon } from "@hugeicons/core-free-icons";
import { motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  children?: ReactNode;
}

const MIN_HEIGHT = 140;
const MAX_HEIGHT = 400;
const DEFAULT_HEIGHT = 180;

export function PromptInput({ children }: PromptInputProps) {
  const { prompt, setPrompt, isGenerating, generate } = useStudioStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
      className="flex-1 flex bg-secondary/60 rounded-2xl border border-border/50 overflow-hidden"
      style={{ height }}
    >
      {/* Left: resize handle + textarea + settings */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Resize handle */}
        <div
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="flex items-center justify-center py-1.5 cursor-ns-resize shrink-0 group"
        >
          <div className="w-10 h-1 rounded-full bg-foreground/10 group-hover:bg-foreground/25 transition-colors" />
        </div>

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

        {/* Settings at bottom-left */}
        <div className="flex items-center gap-2 px-3 pb-3 pt-1 shrink-0 overflow-x-auto no-scrollbar">
          {children}
        </div>
      </div>

      {/* Generate button — fills the right side as a squircle */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={generate}
        disabled={!canSubmit}
        className="w-16 flex flex-col items-center justify-center gap-1.5 bg-[#F54E00] hover:bg-[#e04500] text-white shrink-0 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors rounded-r-2xl"
      >
        <HugeiconsIcon icon={SparklesIcon} size={20} strokeWidth={2} />
        <span className="text-[10px] font-semibold">Generate</span>
      </motion.button>
    </div>
  );
}
