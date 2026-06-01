import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { fetchCharacterDetails } from '../../../api/swapiService.ts';
import { useCharacterDetailsQuery } from '../../../hooks/useCharacterDetailsQuery.ts';
import { createWrapper } from '../test-utils/createWrapper.tsx';

vi.mock('../../../api/swapiService.ts');

describe('useCharacterDetailsQuery', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns idle state when id is undefined', () => {
    const { result } = renderHook(() => useCharacterDetailsQuery(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.isLoading).toBe(false);
    expect(fetchCharacterDetails).not.toHaveBeenCalled();
  });

  it('loads character successfully', async () => {
    vi.mocked(fetchCharacterDetails).mockResolvedValue({
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
    });

    const { result } = renderHook(() => useCharacterDetailsQuery('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(fetchCharacterDetails).toHaveBeenCalledWith('1');

    expect(result.current.data).toEqual({
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
    });
  });

  it('handles fetch error', async () => {
    vi.mocked(fetchCharacterDetails).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useCharacterDetailsQuery('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => {
      expect(result.current.isError).toBe(true);
    });

    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('fail');
    expect(result.current.data).toBeUndefined();
  });

  it('does not fetch if id is undefined', () => {
    renderHook(() => useCharacterDetailsQuery(undefined), {
      wrapper: createWrapper(),
    });

    expect(fetchCharacterDetails).not.toHaveBeenCalled();
  });

  it('creates empty query key when id is undefined', () => {
    const { result } = renderHook(() => useCharacterDetailsQuery(undefined), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(fetchCharacterDetails).not.toHaveBeenCalled();
  });
});
