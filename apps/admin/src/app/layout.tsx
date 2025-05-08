'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './global.css';
import '@aibox/ui/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryClientProvider client={new QueryClient()}>
          <main>{children}</main>
        </QueryClientProvider>
      </body>
    </html>
  );
}
