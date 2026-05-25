import { fetchCharacterDetails } from '../api/swapiService';
import type { ExportCharacter } from '../types/types.ts';

export async function fetchCharactersByIds(
  ids: string[]
): Promise<ExportCharacter[]> {
  const results = await Promise.allSettled(
    ids.map((id) => fetchCharacterDetails(id).then((data) => ({ id, data })))
  );

  return results.map((result, index) => {
    const id = ids[index];

    if (result.status === 'fulfilled') {
      return {
        status: 'fulfilled',
        data: result.value.data,
      };
    }

    return {
      status: 'rejected',
      id,
    };
  });
}
