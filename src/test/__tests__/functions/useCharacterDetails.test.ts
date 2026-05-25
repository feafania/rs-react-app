import { renderHook, waitFor } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';

import { useCharacterDetails } from '../../../hooks/useCharacterDetails.ts';
import { fetchCharacterDetails } from '../../../api/swapiService.ts';

vi.mock('../../../api/swapiService.ts');

describe('useCharacterDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns initial state', () => {
    const { result } = renderHook(() => useCharacterDetails(undefined));

    expect(result.current.character).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('');
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

    const { result } = renderHook(() => useCharacterDetails('1'));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(fetchCharacterDetails).toHaveBeenCalledWith('1');

    expect(result.current.character).toEqual({
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

    expect(result.current.error).toBe('');
  });

  it('handles fetch error', async () => {
    vi.mocked(fetchCharacterDetails).mockRejectedValue(new Error('fail'));

    const { result } = renderHook(() => useCharacterDetails('1'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.error).toBe('Failed to load character details.');

    expect(result.current.character).toBeNull();
  });

  it('does not fetch if id is undefined', () => {
    renderHook(() => useCharacterDetails(undefined));

    expect(fetchCharacterDetails).not.toHaveBeenCalled();
  });
});
