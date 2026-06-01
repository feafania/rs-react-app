import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchCharacterDetails } from '../../../api/swapiService.ts';

describe('fetchCharacterDetails', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('returns character details when request succeeds', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
    };

    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(mockCharacter),
    } as unknown as Response);

    const result = await fetchCharacterDetails('1');

    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/people/1/'));

    expect(result).toEqual(mockCharacter);
  });

  it('throws formatted error when request fails', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: false,
      status: 404,
    } as Response);

    await expect(fetchCharacterDetails('1')).rejects.toThrow(
      'Unable to load character details.'
    );
  });
});
