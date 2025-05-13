import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { handleMutationError } from '@/utils/notifications';

export function createQueryClient() {
  return new QueryClient({
    queryCache: new QueryCache({
      onError: (error, query) => {
        console.error('Query error', query.queryKey, error);
      },
    }),
    mutationCache: new MutationCache({
      onError: handleMutationError,
    }),
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5,
        gcTime: 1000 * 60 * 30,
        retry: 1,
      },
      mutations: { retry: 1 },
    },
  });
}
