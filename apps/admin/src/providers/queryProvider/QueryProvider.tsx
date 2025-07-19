'use client';

import { FC, PropsWithChildren, useMemo } from 'react';
import { QueryClientProvider, hydrate } from '@tanstack/react-query';
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
        {children}
    </QueryClientProvider>
  );
};
export default QueryProvider;
