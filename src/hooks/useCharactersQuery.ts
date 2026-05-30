import { useQuery } from '@tanstack/react-query';

import { fetchCharacters } from '../api/swapiService';
import { queryKeys } from '../api/queryKeys';

export function useCharactersQuery(search: string, page?: number) {
  const safePage = page && page > 0 ? page : 1;

  return useQuery({
    queryKey: queryKeys.characters(search, safePage),

    queryFn: () => fetchCharacters(search, safePage),

    placeholderData: (previousData) => previousData,
  });
}
