"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SettingPickerOption {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
}

interface SettingPickerProps {
  label: string;
  value: string;
  options: SettingPickerOption[];
  onChange: (value: string) => void;
  className?: string;
  panelClassName?: string;
  title?: string;
  renderPanel?: (context: {
    close: () => void;
    selectedOption?: SettingPickerOption;
  }) => ReactNode;
}

export function SettingPicker({
  label,
  value,
  options,
  onChange,
  className,
  panelClassName,
  title,
  renderPanel,
}: SettingPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<{
    bottom: number;
    left: number;
    width: number;
    maxHeight: number;
  } | null>(null);

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value) ?? options[0],
    [options, value]
  );

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) {
      return;
    }

    const updatePosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();

      if (!triggerRect) {
        return;
      }

      const viewportPadding = 12;
      const preferredWidth = Math.min(288, window.innerWidth - viewportPadding * 2);
      const left = Math.min(
        Math.max(viewportPadding, triggerRect.left),
        window.innerWidth - preferredWidth - viewportPadding
      );
      const bottom = Math.max(
        viewportPadding,
        window.innerHeight - triggerRect.top + 10
      );
      const maxHeight = Math.max(viewportPadding, triggerRect.top - viewportPadding);

      setPanelStyle({
        bottom,
        left,
        width: preferredWidth,
        maxHeight,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [isOpen, options]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        !containerRef.current?.contains(target) &&
        !panelRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className={cn(
          "flex h-6.5 items-center gap-1 rounded-md bg-foreground/10 px-2 text-[11px] font-medium text-foreground transition-colors hover:bg-foreground/14 md:h-7 md:gap-1.5 md:px-2.5 md:text-xs",
          isOpen && "bg-foreground/14",
          className
        )}
      >
        {selectedOption?.icon}
        <span className="truncate">{selectedOption?.label}</span>
      </button>

      {isOpen && panelStyle
        ? createPortal(
            <div
              ref={panelRef}
              style={{
                bottom: panelStyle.bottom,
                left: panelStyle.left,
                width: panelStyle.width,
                maxHeight: panelStyle.maxHeight,
              }}
              className={cn(
                "fixed z-[120] overflow-y-auto rounded-[1.2rem] border border-border bg-background shadow-[0_28px_80px_rgba(0,0,0,0.35)]",
                panelClassName
              )}
            >
              {renderPanel ? (
                renderPanel({
                  close: () => setIsOpen(false),
                  selectedOption,
                })
              ) : (
                <>
                  <div className="border-b border-border px-4 py-3.5">
                    <p className="text-sm font-medium tracking-[-0.02em] text-foreground">
                      {title ?? `Select ${label}`}
                    </p>
                  </div>

                  <div className="space-y-1.5 p-2">
                    {options.map((option) => {
                      const isSelected = option.value === value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            onChange(option.value);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-start justify-between gap-3 rounded-[0.95rem] border px-3 py-3 text-left transition-colors",
                            isSelected
                              ? "border-border bg-secondary"
                              : "border-transparent hover:bg-secondary/70"
                          )}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <p className="truncate text-sm font-medium tracking-[-0.01em] text-foreground">
                                {option.label}
                              </p>
                            </div>
                            {option.description ? (
                              <p className="mt-1 text-xs leading-5 text-foreground/55">
                                {option.description}
                              </p>
                            ) : null}
                          </div>

                          <span className="pt-0.5 text-foreground/70">
                            {isSelected ? <Check className="h-4 w-4" /> : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
