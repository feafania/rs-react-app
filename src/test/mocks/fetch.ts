import type { Character } from '../../types/types';
import { vi } from 'vitest';

export const mockFetch = vi.fn();

export const createMockResponse = (data: Character[] = []) =>
  Promise.resolve({
    ok: true,
    json: async () => ({
      results: data,
    }),
  });
