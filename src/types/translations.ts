export interface TranslationKeys {
  common: {
    loading: string;
    error: string;
    retry: string;
    back: string;
    continue: string;
    start: string;
    finish: string;
    score: string;
    points: string;
    level: string;
    progress: string;
  };
  header: {
    words: string;
    games: string;
    progress: string;
  };
  games: {
    title: string;
    matching: {
      title: string;
      description: string;
      instructions: string;
    };
    memory: {
      title: string;
      description: string;
      instructions: string;
    };
    scramble: {
      title: string;
      description: string;
      instructions: string;
    };
  };
  progress: {
    title: string;
    wordsLearned: string;
    totalPoints: string;
    achievements: string;
    nextLevel: string;
  };
}

export interface Translations {
  en: TranslationKeys;
  fr: TranslationKeys;
}