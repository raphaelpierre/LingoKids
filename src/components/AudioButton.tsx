import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { audioService } from '../services/audio/audioService';
import { AudioLanguage } from '../types/audio';

interface AudioButtonProps {
  text: string;
  language?: AudioLanguage;
  className?: string;
}

export function AudioButton({ text, language = 'ar-SA', className = '' }: AudioButtonProps) {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handlePlay = async () => {
    if (!audioService.isSupported()) {
      setError(true);
      return;
    }

    try {
      setIsPlaying(true);
      await audioService.speak(text, language);
    } catch (err) {
      setError(true);
      console.error('Audio playback failed:', err);
    } finally {
      setIsPlaying(false);
    }
  };

  if (error) {
    return (
      <button
        className={`text-red-500 hover:text-red-600 transition-colors ${className}`}
        title="Audio not supported"
        disabled
      >
        <VolumeX size={20} />
      </button>
    );
  }

  return (
    <button
      onClick={handlePlay}
      disabled={isPlaying}
      className={`text-emerald-600 hover:text-emerald-700 transition-colors ${
        isPlaying ? 'animate-pulse' : ''
      } ${className}`}
      title="Play pronunciation"
    >
      <Volume2 size={20} />
    </button>
  );
}