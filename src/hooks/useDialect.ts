import { useState, useEffect } from 'react';
import { APP_CONFIG } from '../constants/config';
import { getStorageItem, setStorageItem } from '../utils/localStorage';
import { Dialect } from '../types/dialects';

export function useDialect() {
  const [dialect, setDialect] = useState<Dialect>(APP_CONFIG.defaultDialect);

  useEffect(() => {
    const savedDialect = getStorageItem<Dialect>('dialect', APP_CONFIG.defaultDialect);
    setDialect(savedDialect);
  }, []);

  const changeDialect = (newDialect: Dialect) => {
    setDialect(newDialect);
    setStorageItem('dialect', newDialect);
  };

  return { dialect, changeDialect };
}