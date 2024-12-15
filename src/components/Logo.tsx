import React from 'react';
import { Languages } from 'lucide-react';

export function Logo() {
  return (
    <div className="relative">
      <Languages size={32} className="text-white" />
      <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full w-4 h-4" />
    </div>
  );
}