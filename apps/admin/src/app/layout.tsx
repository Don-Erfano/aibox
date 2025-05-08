import { QueryProvider } from '@/providers/query-provider';
import './global.css';
import '@aibox/ui/index.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <QueryProvider>
        <body>
          <main>{children}</main>
        </body>
      </QueryProvider>
    </html>
  );
}
