"use client";

import { useRef, useCallback, KeyboardEvent } from "react";
import { ArrowUp } from "lucide-react";
import { motion } from "framer-motion";
import { useStudioStore } from "@/store/useStudioStore";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function PromptInput() {
  const { prompt, setPrompt, isGenerating, generate } = useStudioStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 150)}px`;
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generate();
    }
  };

  const canSubmit = prompt.trim().length > 0 && !isGenerating;

  return (
    <div className="relative flex items-end gap-2 flex-1 bg-secondary/60 rounded-2xl border border-border/50 px-4 py-3">
      <Textarea
        ref={textareaRef}
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          autoResize();
        }}
        onKeyDown={handleKeyDown}
        placeholder="Describe what you want to create..."
        rows={1}
        className="flex-1 resize-none border-0 bg-transparent p-0 text-sm focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-foreground/30 min-h-[20px] max-h-[150px]"
      />
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={generate}
          disabled={!canSubmit}
          size="icon"
          className="h-8 w-8 rounded-full bg-[#F54E00] hover:bg-[#e04500] text-white shrink-0 disabled:opacity-30"
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  );
}
