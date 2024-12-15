import React from 'react';
import { UserProgress } from '../types';
import { Trophy, Star } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

interface ProgressBarProps {
  progress: UserProgress;
}

export function ProgressBar({ progress }: ProgressBarProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-lg p-4 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Trophy className="text-yellow-500" />
          <span className="font-bold">
            {language === 'en' ? 'Your Progress' : 'Votre Progrès'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" fill="currentColor" />
          <span className="font-bold">
            {progress.points} {language === 'en' ? 'Points' : 'Points'}
          </span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-emerald-600 h-2.5 rounded-full transition-all"
          style={{ width: `${(progress.wordsLearned.length / 20) * 100}%` }}
        />
      </div>
      <div className="mt-2 text-sm text-gray-600">
        {progress.wordsLearned.length} {language === 'en' ? 'words learned' : 'mots appris'}
      </div>
    </div>
  );
}