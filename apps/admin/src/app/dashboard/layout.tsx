'use client';
import { useState } from 'react';
import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <div
          className={`h-[calc(100vh_-_64px)] ${
            isOpen ? 'w-[11.5rem]' : 'w-[60px]'
          } transition-all duration-[0.5s] pt-8 pb-3 text-white bg-[#022C22]`}
        >
          <Sidebar setIsOpen={setIsOpen} isOpen={isOpen} />
        </div>
        <div className="p-[24px] w-full">{children}</div>
      </div>
    </div>
  );
}
