"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type DragEvent,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Cancel01Icon,
} from "@hugeicons/core-free-icons";
import {
  draggedStudioAssetToFile,
  hasDraggedStudioAsset,
  readDraggedStudioAsset,
} from "@/lib/studio-drag";
import { useStudioStore } from "@/store/useStudioStore";

interface PromptInputProps {
  children?: ReactNode;
  isGenerating: boolean;
  onGenerate: () => void | Promise<void>;
}

const MIN_TEXTAREA_HEIGHT = 24;
const MAX_TEXTAREA_HEIGHT = 320;

export function PromptInput({
  children,
  isGenerating,
  onGenerate,
}: PromptInputProps) {
  const {
    prompt,
    setPrompt,
    attachments,
    addAttachment,
    removeAttachment,
  } = useStudioStore();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDropTarget, setIsDropTarget] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) {
      return;
    }

    textarea.style.height = "0px";
    const nextHeight = Math.min(
      MAX_TEXTAREA_HEIGHT,
      Math.max(MIN_TEXTAREA_HEIGHT, textarea.scrollHeight)
    );
    textarea.style.height = `${nextHeight}px`;
    textarea.style.overflowY =
      textarea.scrollHeight > MAX_TEXTAREA_HEIGHT ? "auto" : "hidden";
  }, [prompt]);

  const addDroppedFiles = useCallback(
    async (event: DragEvent<HTMLDivElement>) => {
      const files = Array.from(event.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );

      if (files.length > 0) {
        files.forEach(addAttachment);
        return;
      }

      const asset = readDraggedStudioAsset(event.dataTransfer);

      if (!asset) {
        return;
      }

      const file = await draggedStudioAssetToFile(asset);

      if (file.type.startsWith("image/")) {
        addAttachment(file);
      }
    },
    [addAttachment]
  );

  const handleKeyDown = async (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      if (!isGenerating) {
        await onGenerate();
      }
    }
  };

  return (
    <div
      className={isDropTarget
        ? "min-w-0 flex-1 self-end overflow-hidden rounded-l-2xl bg-foreground/5"
        : "min-w-0 flex-1 self-end overflow-hidden"}
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
        void addDroppedFiles(event);
      }}
    >
      <div className="flex shrink-0 items-center gap-2 px-2.5 pt-2.5 pb-2 md:px-4 md:pt-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-foreground/10 text-foreground/50 transition-colors hover:text-foreground/70 cursor-pointer md:h-10 md:w-10"
          title="Add assets"
        >
          <Plus className="h-3 w-3 md:h-4 md:w-4" strokeWidth={1.9} />
        </button>

        {attachments.length > 0 ? (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {attachments.map((attachment, index) => (
              <div key={attachment.preview} className="relative group/att shrink-0">
                <div className="relative h-12 w-12 rounded-lg overflow-hidden border border-border/30">
                  <Image
                    src={attachment.preview}
                    alt={`Attachment ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <button
                  onClick={() => removeAttachment(index)}
                  className="absolute -top-1.5 -right-1.5 h-4 w-4 flex items-center justify-center rounded-full bg-foreground/80 text-background opacity-0 group-hover/att:opacity-100 transition-opacity cursor-pointer"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={10} />
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = event.target.files;

          if (files) {
            Array.from(files).forEach(addAttachment);
          }

          event.target.value = "";
        }}
      />

      <div className="overflow-hidden px-3 pt-1 pb-2 md:px-4 md:pt-0 md:pb-3">
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          onKeyDown={(event) => {
            void handleKeyDown(event);
          }}
          placeholder="Describe your scene..."
          rows={1}
          style={{ outline: "none", boxShadow: "none" }}
          className="block w-full resize-none border-0 bg-transparent p-0 text-sm leading-6 text-foreground outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 caret-foreground placeholder:text-foreground/45"
        />
      </div>

      <div className="flex shrink-0 flex-wrap items-center gap-1.5 px-3 pb-3 pt-1 md:gap-2 md:flex-nowrap md:overflow-x-auto md:no-scrollbar">
        {children}
      </div>
    </div>
  );
}
