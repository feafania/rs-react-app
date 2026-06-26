'use client';

import { QueryClient } from '@tanstack/react-query';

const cacheTTL = Number(process.env.NEXT_PUBLIC_QUERY_CACHE_TTL ?? 600000);

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
