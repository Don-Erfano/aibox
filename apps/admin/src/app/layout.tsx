'use client';

import './global.css';
import '@aibox/ui/index.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>
        <QueryClientProvider client={new QueryClient()}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
