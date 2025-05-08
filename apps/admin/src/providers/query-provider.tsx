'use client';

import { NuqsAdapter } from 'nuqs/adapters/next/app';

export function QueryProvider({ children }: React.PropsWithChildren) {
  return <NuqsAdapter>{children}</NuqsAdapter>;
}
