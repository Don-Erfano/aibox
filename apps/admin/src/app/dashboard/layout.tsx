'use client';

import { Header } from '@/components/header';
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
      <div className="w-full py-[16px] lg:py-[24px]">{children}</div>
    </div>
  );
}
