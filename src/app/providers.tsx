'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { queryClient } from '../lib/queryClient';
import { ThemeProvider } from '../context/ThemeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>{children}</ThemeProvider>
    </QueryClientProvider>
  );
}
