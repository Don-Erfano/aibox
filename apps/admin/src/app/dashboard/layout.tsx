'use client';

import { SidebarProvider } from '@aibox/ui';
// import { sidebarData } from '@/constant/sidebar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex overflow-hidden">
      <SidebarProvider>
        {/*<Header />*/}
        {/*<AIBSidebar sidebarData={sidebarData} />*/}
      </SidebarProvider>
      <div className="w-full py-[84px] 2xl:py-[88px] overflow-auto h-screen">
        {children}
      </div>
    </div>
  );
}
