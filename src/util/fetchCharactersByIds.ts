import { fetchCharacterDetails } from '../api/swapiService';
import { ExportCharacter } from '../types/types';

export async function fetchCharactersByIds(
  ids: string[]
): Promise<ExportCharacter[]> {
  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const data = await fetchCharacterDetails(id);

      return { id, data };
    })
  );

  return results.map((result, index) => {
    const id = ids[index];
    if (result.status === 'fulfilled') {
      return {
        status: 'fulfilled',
        data: result.value.data,
      } satisfies Extract<ExportCharacter, { status: 'fulfilled' }>;
    }

    return {
      status: 'rejected',
      id,
    } satisfies Extract<ExportCharacter, { status: 'rejected' }>;
  });
}
