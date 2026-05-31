import { describe, expect, it, vi, beforeEach } from 'vitest';
import { fetchCharactersByIds } from '../../../util/fetchCharactersByIds.ts';
import { queryClient } from '../../../lib/queryClient.ts';

vi.mock('../../../lib/queryClient', () => ({
  queryClient: {
    fetchQuery: vi.fn(),
  },
}));

const mockedFetchQuery = vi.mocked(queryClient.fetchQuery);

vi.mock('../../../api/swapiService.ts');

const luke = {
  name: 'Luke',
  gender: 'male',
  height: '172',
  birth_year: '19BBY',
  url: 'https://swapi.dev/api/people/1/',
  mass: '77',
  hair_color: 'blond',
  skin_color: 'fair',
  eye_color: 'blue',
};

describe('fetchCharactersByIds', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns fulfilled results', async () => {
    mockedFetchQuery.mockResolvedValue(luke);

    const result = await fetchCharactersByIds(['1']);

    expect(result).toEqual([
      {
        status: 'fulfilled',
        data: luke,
      },
    ]);
  });

  it('returns rejected results', async () => {
    mockedFetchQuery.mockRejectedValue(
      new Error(
        'Unable to load character details. Requested data was not found.'
      )
    );

    const result = await fetchCharactersByIds(['999']);

    expect(result).toEqual([
      {
        status: 'rejected',
        id: '999',
      },
    ]);
  });

  it('handles mixed results', async () => {
    mockedFetchQuery
      .mockResolvedValueOnce(luke)
      .mockRejectedValueOnce(
        new Error(
          'Unable to load character details. Requested data was not found.'
        )
      );

    const result = await fetchCharactersByIds(['1', '2']);

    expect(result).toEqual([
      {
        status: 'fulfilled',
        data: luke,
      },
      {
        status: 'rejected',
        id: '2',
      },
    ]);
  });
});
