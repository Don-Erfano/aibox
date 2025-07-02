import { FC } from 'react';

import { strings } from '@/constant';
import { Card } from '@/components/cards';
import { useGetMostUseGpu } from '@/services';

import { DefaultAvatar } from '../../icons';

const MostUseGpuCard: FC = () => {
  const { data, isFetching } = useGetMostUseGpu();
  return (
    <Card title={strings.mostUseGpu} className="!h-[297px] justify-start">
      <div className="flex flex-col gap-6 overflow-hidden hover:overflow-auto h-[168px] pl-2">
        {!isFetching &&
          data?.packages.map((api, index) => (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex gap-2 items-center">
                <DefaultAvatar />
                <div className="text-sm">
                  <p className="font-medium text-zinc-700">{api.gpu_name}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{api.package_count}</span>
            </div>
          ))}
      </div>
    </Card>
  );
};

export default MostUseGpuCard;
