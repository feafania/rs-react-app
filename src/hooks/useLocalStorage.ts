'use client';

import { useState, useEffect, useRef } from 'react';

export function useLocalStorage(key: string, initialValue: string = '') {
  const [storedValue, setStoredValue] = useState<string>(() => {
    if (typeof window === 'undefined') return initialValue;
    return localStorage.getItem(key) ?? initialValue;
  });

  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
  }, []);

  const setValue = (value: string | ((prev: string) => string)): void => {
    const newValue = typeof value === 'function' ? value(storedValue) : value;
    setStoredValue(newValue);
    localStorage.setItem(key, newValue);
  };

  return [storedValue, setValue] as const;
}
