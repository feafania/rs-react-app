import { useQuery } from '@tanstack/react-query';
import { fetchCharacterDetails } from '../api/swapiService';
import { queryKeys } from '../api/queryKeys';

export function useCharacterDetailsQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? queryKeys.character(id) : ['character', 'empty'],
    queryFn: () => fetchCharacterDetails(id!),
    enabled: Boolean(id),
  });
}
