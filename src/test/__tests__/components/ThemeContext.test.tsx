import { renderHook, act, waitFor } from '@testing-library/react';
import { useContext } from 'react';
import { ThemeContext, ThemeProvider } from '../../../context/ThemeContext.tsx';

describe('ThemeContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );

  it('uses dark theme from localStorage', async () => {
    localStorage.setItem('theme', 'dark');

    renderHook(() => useContext(ThemeContext), { wrapper });

    await waitFor(() => {
      expect(document.body.dataset.theme).toBe('dark');
    });
  });

  it('falls back to light theme for invalid value', async () => {
    localStorage.setItem('theme', 'invalid-theme');

    renderHook(() => useContext(ThemeContext), { wrapper });

    await waitFor(() => {
      expect(document.body.dataset.theme).toBe('light');
    });
  });

  it('toggles theme from light to dark and back', () => {
    localStorage.setItem('theme', 'light');

    const { result } = renderHook(() => useContext(ThemeContext)!, { wrapper });

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem('theme')).toBe('dark');

    act(() => {
      result.current.toggleTheme();
    });

    expect(localStorage.getItem('theme')).toBe('light');
  });
});
