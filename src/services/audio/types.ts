export interface AudioServiceConfig {
  lang: string;
  pitch: number;
  rate: number;
  volume: number;
}

export interface AudioService {
  speak(text: string, language?: string): Promise<void>;
  setConfig(config: Partial<AudioServiceConfig>): void;
  isSupported(): boolean;
}