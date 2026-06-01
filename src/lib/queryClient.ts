import { QueryClient } from '@tanstack/react-query';

const cacheTTL = Number(import.meta.env.VITE_QUERY_CACHE_TTL ?? 600000);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: cacheTTL,
      gcTime: cacheTTL,
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
});
