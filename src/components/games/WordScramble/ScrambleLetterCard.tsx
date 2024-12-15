import React from 'react';
import { cn } from '../../../utils/classNames';

interface ScrambleLetterCardProps {
  letter: string;
  onClick: () => void;
  isPlaced: boolean;
  isError?: boolean;
}

export function ScrambleLetterCard({ 
  letter, 
  onClick, 
  isPlaced,
  isError 
}: ScrambleLetterCardProps) {
  return (
    <button
      onClick={onClick}
      disabled={isPlaced}
      className={cn(
        "w-12 h-12 flex items-center justify-center",
        "text-xl font-bold font-arabic rounded-lg",
        "transition-all duration-300 transform",
        isPlaced && "opacity-0 scale-0",
        isError && "animate-shake bg-red-100 text-red-700",
        !isPlaced && !isError && "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
      )}
    >
      {letter}
    </button>
  );
}