'use client';

import { queryClient } from '../lib/queryClient';
import type { ExportCharacter } from '../types/types';
import { fetchCharacterDetails } from '../api/swapiService';
import { queryKeys } from '../api/queryKeys';

export async function fetchCharactersByIds(
  ids: string[]
): Promise<ExportCharacter[]> {
  const results = await Promise.allSettled(
    ids.map(async (id) => {
      const data = await queryClient.fetchQuery({
        queryKey: queryKeys.character(id),
        queryFn: () => fetchCharacterDetails(id),
      });

      return { id, data };
    })
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
