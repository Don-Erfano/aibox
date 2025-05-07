import { QueryClient, QueryCache } from '@tanstack/react-query';

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError(error, query) {
        console.error('error', query.queryKey, ':', error);
      },
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
      },
      mutations: {
        retry: 1,
      },
    },
  });
}
