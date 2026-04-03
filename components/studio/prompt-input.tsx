"use client";

import { useRef, useCallback, KeyboardEvent, ReactNode } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  children?: ReactNode;
}

export function PromptInput({ children }: PromptInputProps) {
  const { prompt, setPrompt, isGenerating, generate } = useStudioStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  const canSubmit = prompt.trim().length > 0 && !isGenerating;

  return (
    <div className="flex-1 flex gap-2 bg-secondary/60 rounded-2xl border border-border/50 p-3">
      {/* Left side: textarea on top, settings at bottom */}
      <div className="flex-1 flex flex-col justify-between gap-2">
        <Textarea
          ref={textareaRef}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
            autoResize();
          }}
          onKeyDown={handleKeyDown}
          placeholder="Describe what you want to create..."
          rows={2}
          className="flex-1 resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/30 min-h-[40px] max-h-[120px]"
        />
        {/* Settings at bottom-left */}
        <div className="flex items-center">
          {children}
        </div>
      </div>

      {/* Submit button - big squircle on the right, vertically centered */}
      <div className="flex items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={generate}
          disabled={!canSubmit}
          className="h-12 w-12 flex items-center justify-center rounded-2xl bg-[#F54E00] hover:bg-[#e04500] text-white shrink-0 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors"
        >
          <ArrowUp className="h-5 w-5" strokeWidth={2.5} />
        </motion.button>
      </div>
    </div>
  );
}
