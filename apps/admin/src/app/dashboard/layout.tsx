import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import '@aibox/ui/index.css';

export const metadata = {
  title: 'Dashboard',
  description: 'Dashboard Home',
};

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
        <div className="p-[24px] w-full">{children}</div>
      </div>
    </div>
  );
}
