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
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <SidebarProvider>
          <Sidebar
            sidebarData={sidebarData}
            className="transition-all duration-300 ease-in-out"
          />
        </SidebarProvider>
        <LayoutModeProvider>{children}</LayoutModeProvider>
      </div>
    </div>
  );
}
