import '@testing-library/jest-dom';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.stubGlobal('fetch', vi.fn());

const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,

    setItem: (key: string, value: string) => {
      store[key] = value;
    },

    clear: () => {
      store = {};
    },

    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
