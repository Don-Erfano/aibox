import { FC } from 'react';

import { strings } from '@/constant';
import { useGetGpuUsers } from '@/services';
import { Card, GPUIcon } from '@aibox/ui';
import { InformationSkeleton } from '../sekeltons';

const GpuComputingCard: FC = () => {
  const { data, isLoading } = useGetGpuUsers();

  if (isLoading) return <InformationSkeleton />;

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-orange-100 p-2">
            <GPUIcon />
          </div>
          <p className="text-md font-medium text-zinc-700">
            {strings.gpuComputing}
          </p>
        </div>
      }
      className="!h-[297px] bg-white [&>div[aria-label=card-header]]:leading-11"
    >
      <div className="flex !h-[168px] flex-col justify-between gap-3 overflow-hidden pl-2 hover:overflow-auto">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.inQueueUsers}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {data?.in_queue_users_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.usersCurrentlyComputing}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {data?.running_users_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.avarageUseHours}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {Math.ceil(Number(data?.average_usage_time)) || ''}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GpuComputingCard;
