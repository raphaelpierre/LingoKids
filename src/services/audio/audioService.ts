import { AudioService, AudioServiceConfig } from './types';

const DEFAULT_CONFIG: AudioServiceConfig = {
  lang: 'ar-SA',
  pitch: 1,
  rate: 0.8,
  volume: 1
};

class AudioServiceImpl implements AudioService {
  private static instance: AudioServiceImpl;
  private synthesis: SpeechSynthesis;
  private config: AudioServiceConfig;

  private constructor() {
    this.synthesis = window.speechSynthesis;
    this.config = DEFAULT_CONFIG;
  }

  public static getInstance(): AudioServiceImpl {
    if (!AudioServiceImpl.instance) {
      AudioServiceImpl.instance = new AudioServiceImpl();
    }
    return AudioServiceImpl.instance;
  }

  public async speak(text: string, language = 'ar-SA'): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.synthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.pitch = this.config.pitch;
        utterance.rate = this.config.rate;
        utterance.volume = this.config.volume;

        utterance.onend = () => resolve();
        utterance.onerror = (error) => reject(error);

        this.synthesis.speak(utterance);
      } catch (error) {
        reject(error);
      }
    });
  }

  public setConfig(config: Partial<AudioServiceConfig>): void {
    this.config = { ...this.config, ...config };
  }

  public isSupported(): boolean {
    return 'speechSynthesis' in window;
  }
}

export const audioService = AudioServiceImpl.getInstance();