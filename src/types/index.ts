export interface Word {
  arabic: {
    standard: string;
    moroccan?: string;
    tunisian?: string;
  };
  english: string;
  french: string;
  pronunciation: {
    standard: string;
    moroccan?: string;
    tunisian?: string;
  };
  image: string;
}

export interface Category {
  id: string;
  name: string;
  nameFr: string;
  words: Word[];
}

export interface GameScore {
  gameId: string;
  score: number;
  date: string;
}

export interface UserProgress {
  points: number;
  wordsLearned: string[];
  gameScores: GameScore[];
  language: 'en' | 'fr';
}

export * from './audio';
export * from './translations';
export * from './dialects';