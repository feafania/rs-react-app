import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';

import { useCharactersQuery } from '../../../hooks/useCharactersQuery.ts';
import { fetchCharacters } from '../../../api/swapiService.ts';
import { createWrapper } from '../test-utils/createWrapper.tsx';

vi.mock('../../../api/swapiService.ts');

describe('useCharactersQuery cache behavior', () => {
  it('does not refetch same query (cache reuse)', async () => {
    vi.mocked(fetchCharacters).mockResolvedValue({
      results: [],
      totalCount: 0,
    });

    const wrapper = createWrapper();

    const { rerender } = renderHook(
      ({ search, page }) => useCharactersQuery(search, page),
      {
        wrapper,
        initialProps: { search: 'Luke', page: 1 },
      }
    );

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledTimes(1);
    });

    rerender({ search: 'Luke', page: 1 });

    await waitFor(() => {
      expect(fetchCharacters).toHaveBeenCalledTimes(1);
    });
  });
});
