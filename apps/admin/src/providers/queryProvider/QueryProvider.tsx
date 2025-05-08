'use client';

import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider, hydrate } from '@tanstack/react-query';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { createQueryClient } from '@/providers/queryProvider/queryClient';

export interface QueryProviderProps {
  dehydratedState: unknown;
}

const QueryProvider: FC<PropsWithChildren<QueryProviderProps>> = ({
  children,
  dehydratedState,
}) => {
  const queryClient = useMemo(() => createQueryClient(), []);
  hydrate(queryClient, dehydratedState);

  return (
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>{children} </NuqsAdapter>
    </QueryClientProvider>
  );
};
export default QueryProvider;
