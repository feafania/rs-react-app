'use client';

import { createContext, useEffect, type ReactNode } from 'react';
import type { Theme, ThemeContextType } from '../types/types';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

type ThemeProviderProps = {
  children: ReactNode;
};

function ThemeProvider({ children }: ThemeProviderProps) {
  const [rawTheme, setTheme] = useLocalStorage('theme', 'light');
  const theme = rawTheme === 'dark' ? 'dark' : ('light' as Theme);

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeContext, ThemeProvider };
