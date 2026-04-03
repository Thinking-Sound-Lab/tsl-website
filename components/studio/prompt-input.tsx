"use client";

import { useRef, useCallback, useState, KeyboardEvent, ReactNode, PointerEvent } from "react";
import { ArrowUp } from "lucide-react";
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
    // Dragging up increases height
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

      {/* Textarea fills available space */}
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

      {/* Bottom bar: settings left, generate button right */}
      <div className="flex items-center justify-between gap-3 px-3 pb-3 pt-1 shrink-0">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          {children}
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.96 }}
          onClick={generate}
          disabled={!canSubmit}
          className="h-10 px-5 flex items-center gap-2 rounded-xl bg-[#F54E00] hover:bg-[#e04500] text-white text-sm font-semibold shrink-0 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          Generate
          <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
