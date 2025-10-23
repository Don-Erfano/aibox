import { FC } from 'react';

import { strings } from '@/constant';
import { useGetMostUseGpu } from '@/services';
import { Card, DefaultAvatar } from '@aibox/ui';
import { InformationSkeleton } from '../sekeltons';
import { useCardFilter } from '../../constants';
import { EmptyState } from '../empty-stat';

const MostUseGpuCard: FC = () => {
  const { filter, ...rest } = useCardFilter();
  const { data, isFetching, isLoading } = useGetMostUseGpu(filter);

  if (isLoading || isFetching) {
    return <InformationSkeleton />;
  }

  if (!data?.packages.length) {
    return (
      <Card
        title={strings.mostSellerApis}
        {...rest}
        className="!h-[297px] bg-white [&>div[aria-label=card-header]]:leading-11"
      >
        <EmptyState />
      </Card>
    );
  }

  return (
    <Card
      {...rest}
      title={strings.mostUseGpu}
      className="!h-[297px] bg-white [&>div[aria-label=card-header]]:leading-11"
    >
      <div className="flex !h-[168px] flex-col justify-start gap-3 overflow-hidden pl-2 hover:overflow-auto">
        {data?.packages.map((api, index) => (
          <div className="flex items-center justify-between" key={index}>
            <div className="flex items-center gap-2">
              <DefaultAvatar />
              <div className="text-sm">
                <p className="leading-12 font-medium text-zinc-700">
                  {api.gpu_name}
                </p>
              </div>
            </div>
            <span className="text-xs text-gray-500">
              {api.package_count} {strings.package}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MostUseGpuCard;
