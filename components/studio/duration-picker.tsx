"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { Clock01Icon } from "@hugeicons/core-free-icons";
import { Slider } from "@/components/ui/slider";
import { SettingPicker } from "./setting-picker";

interface DurationPickerProps {
  value: number;
  onChange: (value: number) => void;
}

const MIN_DURATION = 3;
const MAX_DURATION = 15;

export function DurationPicker({ value, onChange }: DurationPickerProps) {
  return (
    <SettingPicker
      label="duration"
      title="Choose duration"
      value={String(value)}
      options={[
        {
          value: String(value),
          label: `${value}s`,
          icon: <HugeiconsIcon icon={Clock01Icon} size={13} />,
        },
      ]}
      onChange={() => {}}
      renderPanel={() => (
        <div className="p-3">
          <div className="rounded-[1rem] border border-border bg-secondary p-3">
            <p className="mb-3 text-sm font-medium tracking-[-0.02em] text-foreground">
              Choose duration
            </p>
            <div className="mb-4 flex h-9 items-center rounded-[0.85rem] border border-border bg-background px-3 text-sm font-medium text-foreground">
              {value}s
            </div>
            <Slider
              min={MIN_DURATION}
              max={MAX_DURATION}
              step={1}
              value={[value]}
              onValueChange={([nextValue]) => onChange(nextValue)}
              className="[&_span[data-slot=slider-range]]:bg-foreground [&_span[data-slot=slider-thumb]]:size-4 [&_span[data-slot=slider-thumb]]:border-foreground [&_span[data-slot=slider-thumb]]:bg-background [&_span[data-slot=slider-track]]:bg-border"
            />
          </div>
        </div>
      )}
    />
  );
}
