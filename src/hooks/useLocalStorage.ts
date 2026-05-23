import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string = '') {
  const [storedValue, setStoredValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string): void => {
    setStoredValue(value);
    localStorage.setItem(key, value);
  };

  return [storedValue, setValue] as const;
}
