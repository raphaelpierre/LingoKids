const STORAGE_KEYS = {
  language: 'language',
  dialect: 'dialect',
  progress: 'userProgress'
} as const;

export function getStorageItem<T>(key: keyof typeof STORAGE_KEYS, defaultValue: T): T {
  try {
    const item = localStorage.getItem(STORAGE_KEYS[key]);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export function setStorageItem<T>(key: keyof typeof STORAGE_KEYS, value: T): void {
  try {
    localStorage.setItem(STORAGE_KEYS[key], JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage:`, error);
  }
}