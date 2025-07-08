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
      <div className="w-full my-[84px] 2xl:my-[88px] overflow-auto h-screen px-4 sm:px-8 md:px-16 lg:px-8 2xl:px-11">
        {children}
      </div>
    </div>
  );
}
