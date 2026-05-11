import '@testing-library/jest-dom';

import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { localStorageMock } from './mocks/localStorage.ts';
import { mockFetch } from './mocks/fetch.ts';

beforeEach(() => {
  window.localStorage.clear();
  vi.clearAllMocks();
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

vi.stubGlobal('fetch', mockFetch);

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});
