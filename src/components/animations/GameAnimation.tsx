import React from 'react';
import { cn } from '../../utils/classNames';

interface GameAnimationProps {
  type: 'success' | 'error';
  isVisible: boolean;
  children?: React.ReactNode;
}

export function GameAnimation({ type, isVisible, children }: GameAnimationProps) {
  return (
    <div
      className={cn(
        'absolute inset-0 flex items-center justify-center transition-all duration-500',
        type === 'success' ? 'bg-emerald-500/20' : 'bg-red-500/20',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div
        className={cn(
          'transform transition-transform duration-500',
          isVisible ? 'scale-100' : 'scale-0',
          type === 'success' ? 'text-emerald-600' : 'text-red-600',
          'text-4xl font-bold'
        )}
      >
        {children || (type === 'success' ? '✓' : '×')}
      </div>
    </div>
  );
}