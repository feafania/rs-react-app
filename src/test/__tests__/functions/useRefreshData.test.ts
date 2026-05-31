import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useRefreshData } from '../../../hooks/useRefreshData';

const invalidateQueries = vi.fn();

vi.mock('@tanstack/react-query', () => ({
  useQueryClient: () => ({
    invalidateQueries,
  }),
}));

describe('useRefreshData', () => {
  it('invalidates characters and character queries', () => {
    const { result } = renderHook(() => useRefreshData());

    act(() => {
      result.current.refreshAll();
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['characters'],
    });

    expect(invalidateQueries).toHaveBeenCalledWith({
      queryKey: ['character'],
    });
  });
});
