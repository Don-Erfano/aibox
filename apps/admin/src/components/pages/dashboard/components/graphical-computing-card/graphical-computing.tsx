import { FC } from 'react';

import { strings } from '@/constant';
import { Card } from '@/components/cards';
import { useGetGpuUsers } from '@/services';

import { GPUIcon } from '../../icons';

const GpuComputingCard: FC = () => {
  const { data } = useGetGpuUsers();

  return (
    <Card className="!h-[297px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-orange-100 p-2 rounded-md">
            <GPUIcon />
          </div>
          <p className="text-md font-medium text-zinc-700">
            {strings.gpuComputing}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              {strings.inQueueUsers}
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {data?.in_queue_users_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              {strings.usersCurrentlyComputing}
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {data?.running_users_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              {strings.avarageUseHours}
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {Math.ceil(Number(data?.average_usage_time)) || ''}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GpuComputingCard;
