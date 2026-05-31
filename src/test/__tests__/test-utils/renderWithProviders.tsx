// test-utils/renderWithProviders.tsx

import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { ThemeProvider } from '../../../context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

interface RenderOptions {
  initialPath?: string;
}

export function renderWithProviders(
  ui: ReactNode,
  { initialPath = '/' }: RenderOptions = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
