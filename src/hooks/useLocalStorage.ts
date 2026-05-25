import { useState } from 'react';

export function useLocalStorage(key: string, initialValue: string = '') {
  const [storedValue, setStoredValue] = useState<string>(() => {
    return localStorage.getItem(key) ?? initialValue;
  });

  const setValue = (value: string | ((prev: string) => string)): void => {
    const newValue = typeof value === 'function' ? value(storedValue) : value;
    setStoredValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [storedValue, setValue] as const;
}
