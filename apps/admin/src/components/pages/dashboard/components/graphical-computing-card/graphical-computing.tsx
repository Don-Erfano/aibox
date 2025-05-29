import { Card } from '@/components/cards';
import { FC } from 'react';
import { GPUIcon } from '../../icons';
import { useGetGpuUsers } from '@/services';

const GpuComputingCard: FC = () => {
  const { data } = useGetGpuUsers();
  return (
    <Card className="!h-[297px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-2 rounded-md">
            <GPUIcon />
          </div>
          <p>API مارکت</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کاربران در صف
            </p>
            <span>{data?.in_queue_users_count}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کاربران درحال استفاده
            </p>
            <span>{data?.running_users_count}</span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کل APIها
            </p>
            <span>{data?.average_usage_time}</span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GpuComputingCard;
