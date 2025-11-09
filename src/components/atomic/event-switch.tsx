"use client";

import { useId } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/atomic/radio-group";

interface EventSwitchProps {
  value: string;
  onValueChange: (value: string) => void;
}

export function EventSwitch({ value, onValueChange }: EventSwitchProps) {
  const id = useId();

  return (
    <div className="inline-flex h-12 rounded-full bg-neutral-800/80 p-1">
      <RadioGroup
        value={value}
        onValueChange={onValueChange}
        className="group relative inline-grid grid-cols-[1fr_1fr] items-center gap-0 text-base font-semibold after:absolute after:inset-y-0 after:w-1/2 after:rounded-full after:bg-brand-orange after:shadow-lg after:transition-[translate,box-shadow] after:duration-300 after:ease-[cubic-bezier(0.16,1,0.3,1)] has-focus-visible:after:border-brand-orange has-focus-visible:after:ring-[3px] has-focus-visible:after:ring-brand-orange/50 data-[state=past]:after:translate-x-full data-[state=upcoming]:after:translate-x-0"
        data-state={value}
      >
        <label className="relative z-10 inline-flex h-full min-w-[120px] cursor-pointer items-center justify-center px-6 whitespace-nowrap transition-colors select-none group-data-[state=upcoming]:text-neutral-800/80 group-data-[state=past]:text-brand-orange">
          Upcoming
          <RadioGroupItem id={`${id}-1`} value="upcoming" className="sr-only" />
        </label>
        <label className="relative z-10 inline-flex h-full min-w-[120px] cursor-pointer items-center justify-center px-6 whitespace-nowrap transition-colors select-none group-data-[state=past]:text-neutral-800/80 group-data-[state=upcoming]:text-brand-orange">
          Past
          <RadioGroupItem id={`${id}-2`} value="past" className="sr-only" />
        </label>
      </RadioGroup>
    </div>
  );
}
