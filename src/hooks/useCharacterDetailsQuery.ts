import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../api/queryKeys';
import { fetchCharacterDetails } from '../api/swapiService';

export function useCharacterDetailsQuery(id: string | undefined) {
  return useQuery({
    queryKey: id ? queryKeys.character(id) : ['character', 'empty'],
    queryFn: () => fetchCharacterDetails(id!),
    enabled: Boolean(id),
  });
}
