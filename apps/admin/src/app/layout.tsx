import './global.css';
import { type ReactNode } from 'react';
import { dehydrate } from '@tanstack/react-query';
import QueryProvider, { createQueryClient } from '@/providers/queryProvider';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const serverQueryClient = createQueryClient();
  const dehydratedState = dehydrate(serverQueryClient);

  return (
    <html lang="fa" dir="rtl">
      <body>
        <NuqsAdapter>
          <QueryProvider dehydratedState={dehydratedState}>
            {children}
          </QueryProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
