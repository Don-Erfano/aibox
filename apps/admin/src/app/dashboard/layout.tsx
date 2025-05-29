'use client';

import { Header } from '@/components/header';
import { LayoutModeProvider } from './layout-context';
import { AIBSidebar, SidebarProvider } from '@aibox/ui';
import { sidebarData } from '@/constant/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex overflow-hidden">
      <SidebarProvider>
        <Header />
        <AIBSidebar sidebarData={sidebarData} />
      </SidebarProvider>
      <LayoutModeProvider>{children}</LayoutModeProvider>
    </div>
  );
}
