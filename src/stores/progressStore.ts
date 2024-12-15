import { create } from 'zustand';
import { UserProgress, GameScore } from '../types';
import { progressService } from '../services/progress/progressService';

interface ProgressState {
  progress: UserProgress | null;
  loading: boolean;
  error: string | null;
  loadProgress: (userId: string) => Promise<void>;
  updatePoints: (userId: string, points: number) => Promise<void>;
  addLearnedWord: (userId: string, wordId: string) => Promise<void>;
  addGameScore: (userId: string, score: GameScore) => Promise<void>;
  updateLanguage: (userId: string, language: 'en' | 'fr') => Promise<void>;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  progress: null,
  loading: false,
  error: null,

  loadProgress: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const progress = await progressService.getUserProgress(userId);
      set({ progress, loading: false });
    } catch (error) {
      console.error('Error loading progress:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePoints: async (userId: string, points: number) => {
    if (!get().progress) return;
    
    try {
      set({ loading: true, error: null });
      await progressService.updatePoints(userId, points);
      set(state => ({
        progress: state.progress ? {
          ...state.progress,
          points: state.progress.points + points
        } : null,
        loading: false
      }));
    } catch (error) {
      console.error('Error updating points:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  addLearnedWord: async (userId: string, wordId: string) => {
    if (!get().progress) return;
    
    try {
      set({ loading: true, error: null });
      await progressService.addLearnedWord(userId, wordId);
      set(state => ({
        progress: state.progress ? {
          ...state.progress,
          wordsLearned: [...state.progress.wordsLearned, wordId]
        } : null,
        loading: false
      }));
    } catch (error) {
      console.error('Error adding learned word:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  addGameScore: async (userId: string, score: GameScore) => {
    if (!get().progress) return;
    
    try {
      set({ loading: true, error: null });
      await progressService.addGameScore(userId, score);
      set(state => ({
        progress: state.progress ? {
          ...state.progress,
          gameScores: [...state.progress.gameScores, score]
        } : null,
        loading: false
      }));
    } catch (error) {
      console.error('Error adding game score:', error);
      set({ error: (error as Error).message, loading: false });
    }
  },

  updateLanguage: async (userId: string, language: 'en' | 'fr') => {
    if (!get().progress) return;
    
    try {
      set({ loading: true, error: null });
      await progressService.updateLanguage(userId, language);
      set(state => ({
        progress: state.progress ? {
          ...state.progress,
          language
        } : null,
        loading: false
      }));
    } catch (error) {
      console.error('Error updating language:', error);
      set({ error: (error as Error).message, loading: false });
    }
  }
}));