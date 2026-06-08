import { renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useTheme } from '../../../hooks/useTheme.ts';

describe('useTheme', () => {
  it('throws when used outside ThemeProvider', () => {
    expect(() => renderHook(() => useTheme())).toThrow(
      'useTheme must be used inside ThemeProvider'
    );
  });
});
