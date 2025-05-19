'use client';
import { DashboardCard } from '@/components';

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-6 flex-wrap sm:flex-nowrap lg:flex-nowrap">
        <DashboardCard.Container className="sm:w-1/2 lg:w-1/4 md:w-1/2 w-full">
          12
        </DashboardCard.Container>
        <DashboardCard.Container className="sm:w-1/2 lg:w-1/4 md:w-1/2 w-full">
          34
        </DashboardCard.Container>
        <DashboardCard.Container className="sm:w-1/2 lg:w-1/4 md:w-1/2 w-full">
          56
        </DashboardCard.Container>
        <DashboardCard.Container className="sm:w-1/2 lg:w-1/4 md:w-1/2 w-full">
          78
        </DashboardCard.Container>
      </div>
    </div>
  );
}
