'use client';

import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { LayoutModeProvider } from './layoutContext';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <div>
          <Sidebar />
        </div>
        <LayoutModeProvider>{children}</LayoutModeProvider>
      </div>
    </div>
  );
}
