import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../api/queryKeys';
import { fetchCharacters } from '../api/swapiService';

interface Character {
  name: string;
  gender: string;
  height: string;
  birth_year: string;
  url: string;
}

interface SwapiResponse {
  results: Character[];
  totalCount: number;
}

export function useCharactersQuery(
  search: string,
  page?: number,
  options?: { initialData?: SwapiResponse | null }
) {
  const safePage = page && page > 0 ? page : 1;

  return useQuery({
    queryKey: queryKeys.characters(search, safePage),
    queryFn: () => fetchCharacters(search, safePage),
    placeholderData: (previousData) => previousData,
    initialData: options?.initialData ?? undefined,
    staleTime: 5000,
  });
}
