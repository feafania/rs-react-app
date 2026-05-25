import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fetchCharacterDetails } from '../../../api/swapiService.ts';
import { fetchCharactersByIds } from '../../../util/fetchCharactersByIds.ts';

vi.mock('../../../api/swapiService.ts');

describe('fetchCharactersByIds', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns fulfilled results', async () => {
    vi.mocked(fetchCharacterDetails).mockResolvedValue({
      name: 'Luke',
      gender: 'male',
      height: '172',
      birth_year: '19BBY',
      url: 'https://swapi.dev/api/people/1/',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
    });

    const result = await fetchCharactersByIds(['1']);

    expect(result).toEqual([
      {
        status: 'fulfilled',
        data: {
          name: 'Luke',
          gender: 'male',
          height: '172',
          birth_year: '19BBY',
          url: 'https://swapi.dev/api/people/1/',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
        },
      },
    ]);
  });

  it('returns rejected results', async () => {
    vi.mocked(fetchCharacterDetails).mockRejectedValue(new Error('fail'));

    const result = await fetchCharactersByIds(['999']);

    expect(result).toEqual([
      {
        status: 'rejected',
        id: '999',
      },
    ]);
  });

  it('handles mixed results', async () => {
    vi.mocked(fetchCharacterDetails)
      .mockResolvedValueOnce({
        name: 'Luke',
        gender: 'male',
        height: '172',
        birth_year: '19BBY',
        url: 'https://swapi.dev/api/people/1/',
        mass: '77',
        hair_color: 'blond',
        skin_color: 'fair',
        eye_color: 'blue',
      })
      .mockRejectedValueOnce(new Error('fail'));

    const result = await fetchCharactersByIds(['1', '2']);

    expect(result).toEqual([
      {
        status: 'fulfilled',
        data: {
          name: 'Luke',
          gender: 'male',
          height: '172',
          birth_year: '19BBY',
          url: 'https://swapi.dev/api/people/1/',
          mass: '77',
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
        },
      },
      {
        status: 'rejected',
        id: '2',
      },
    ]);
  });
});
