import { useState, useEffect } from 'react';
import { UserProgress } from '../types';
import { getStorageItem, setStorageItem } from '../utils/localStorage';

const INITIAL_PROGRESS: UserProgress = {
  points: 0,
  wordsLearned: [],
  gameScores: [],
  language: 'en'
};

export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);

  useEffect(() => {
    const savedProgress = getStorageItem<UserProgress>('progress', INITIAL_PROGRESS);
    setProgress(savedProgress);
  }, []);

  const updateProgress = (newProgress: Partial<UserProgress>) => {
    setProgress(prev => {
      const updated = { ...prev, ...newProgress };
      setStorageItem('progress', updated);
      return updated;
    });
  };

  const addPoints = (points: number) => {
    updateProgress({ points: progress.points + points });
  };

  const markWordAsLearned = (wordId: string) => {
    if (!progress.wordsLearned.includes(wordId)) {
      updateProgress({
        wordsLearned: [...progress.wordsLearned, wordId],
        points: progress.points + 5
      });
    }
  };

  return { progress, addPoints, markWordAsLearned };
}