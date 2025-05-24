'use client';

import { Header } from '@/components/header';
import { LayoutModeProvider } from './layout-context';

import { sidebarData } from '@/components/sidebar/constants';

import { SidebarProvider } from '@aibox/ui';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex overflow-hidden">
      <SidebarProvider>
        <Header />
        <Sidebar sidebarData={sidebarData} />
      </SidebarProvider>
      <LayoutModeProvider>{children}</LayoutModeProvider>
    </div>
  );
}
