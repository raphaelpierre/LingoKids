export type AudioLanguage = 'ar-SA' | 'en-US' | 'fr-FR';

export interface AudioConfig {
  lang: AudioLanguage;
  pitch: number;
  rate: number;
  volume: number;
}