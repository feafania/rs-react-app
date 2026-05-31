import * as ReactQuery from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import { useRefreshCharacterDetails } from '../../../hooks/useRefreshCharacterDetails.ts';

const invalidateQueries = vi.fn();

vi.mock('@tanstack/react-query', async () => {
  const actual = await vi.importActual<typeof ReactQuery>(
    '@tanstack/react-query'
  );

  return {
    ...actual,
    useQueryClient: () => ({
      invalidateQueries,
    }),
  };
});

describe('useRefreshCharacterDetails', () => {
  it('invalidates character query', () => {
    const { result } = renderHook(() => useRefreshCharacterDetails('1'));

    act(() => {
      result.current();
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['character', '1'],
    });
  });
});
