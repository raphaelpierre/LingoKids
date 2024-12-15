export const APP_CONFIG = {
  name: 'LingoKids',
  description: {
    en: 'Learn Arabic through fun and interactive games',
    fr: 'Apprendre l\'arabe avec des jeux amusants et interactifs'
  },
  supportedLanguages: ['en', 'fr'] as const,
  defaultLanguage: 'en' as const,
  defaultDialect: 'standard' as const
};