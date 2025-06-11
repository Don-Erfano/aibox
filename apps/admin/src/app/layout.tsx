import './global.css';
import { ReactNode } from 'react';
import { dehydrate } from '@tanstack/react-query';
import { Notifications } from '@/components/notification/Notifications';
import QueryProvider, { createQueryClient } from '@/providers/queryProvider';

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
        <QueryProvider dehydratedState={dehydratedState}>
          {children}
          <Notifications />
        </QueryProvider>
      </body>
    </html>
  );
}
