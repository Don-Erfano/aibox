import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
// import { AppSidebar } from '@aibox/ui';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <Sidebar />

        <main className="p-[16px] lg:p-[24px] w-full">{children}</main>
      </div>
    </div>
  );
}
