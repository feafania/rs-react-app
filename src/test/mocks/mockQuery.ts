import type { FetchCharactersResponse } from '../../api/swapiService.ts';
import { vi } from 'vitest';

export interface MockQuery {
  data: FetchCharactersResponse | undefined;
  isLoading: boolean;
  isFetching: boolean;
  error: Error | null;
  refetch: () => void;
}

export function mockQuerySuccess(data: FetchCharactersResponse): MockQuery {
  return {
    data,
    isLoading: false,
    isFetching: false,
    error: null,
    refetch: vi.fn(),
  };
}

export function mockQueryEmpty(): MockQuery {
  return mockQuerySuccess({ results: [], totalCount: 0 });
}
