import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../api/queryKeys';

export function useRefreshCharacterDetails(id: string) {
  const queryClient = useQueryClient();

  return () =>
    queryClient.invalidateQueries({
      queryKey: queryKeys.character(id),
    });
}
