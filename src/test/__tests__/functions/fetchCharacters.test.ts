import { fetchCharacters } from '../../../api/swapiService.ts';

describe('fetchCharacters', () => {
  it('does not add search param when search is empty', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        count: 0,
        results: [],
      }),
    } as unknown as Response);

    await fetchCharacters('   ', 1);

    expect(fetch).toHaveBeenCalledWith(expect.not.stringContaining('search='));
  });
});
