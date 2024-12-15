import React from 'react';
import { Logo } from '../Logo';

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center">
      <div className="animate-bounce mb-4">
        <Logo className="w-16 h-16" />
      </div>
      <h1 className="text-2xl font-bold text-emerald-900 mb-2">LingoKids</h1>
      <p className="text-emerald-600">Loading...</p>
    </div>
  );
}