import { useQueryClient } from '@tanstack/react-query';

export function useRefreshData() {
  const queryClient = useQueryClient();

  const refreshAll = () => {
    queryClient.invalidateQueries({
      queryKey: ['characters'],
    });

    queryClient.invalidateQueries({
      queryKey: ['character'],
    });
  };

  return { refreshAll };
}
