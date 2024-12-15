import React from 'react';
import { cn } from '../../../utils/classNames';

interface ScrambleAnswerSlotProps {
  letter: string;
  isError?: boolean;
}

export function ScrambleAnswerSlot({ letter, isError }: ScrambleAnswerSlotProps) {
  return (
    <div
      className={cn(
        "w-12 h-12 flex items-center justify-center",
        "text-xl font-bold font-arabic rounded-lg",
        "transition-all duration-300",
        "border-2",
        isError ? "border-red-500 animate-shake" : "border-emerald-600",
        letter ? "scale-110" : "scale-100"
      )}
    >
      {letter}
    </div>
  );
}