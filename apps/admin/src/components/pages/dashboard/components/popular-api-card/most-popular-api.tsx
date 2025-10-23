import { FC } from 'react';

import { strings } from '@/constant';
import { useGetPopularApis } from '@/services';
import { Card, DefaultAvatar } from '@aibox/ui';

import { EmptyState } from '../empty-stat';
import { useCardFilter } from '../../constants';
import { InformationSkeleton } from '../sekeltons';

const MostPopularAPICard: FC = () => {
  const { filter, ...rest } = useCardFilter();
  const { data, isFetching, isLoading } = useGetPopularApis(filter);

  if (isLoading || isFetching) {
    return <InformationSkeleton />;
  }

  if (!data?.version_info.length) {
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
      title={strings.mostUsedApis}
      className="!h-[297px] justify-start bg-white [&>div[aria-label=card-header]]:leading-11"
      {...rest}
    >
      <div className="flex h-full flex-col justify-end gap-3">
        {data?.version_info.map((api, index) => (
          <div className="flex h-12 items-center justify-between" key={index}>
            <div className="flex items-center gap-2">
              <DefaultAvatar />
              <div className="flex flex-col gap-1 text-sm">
                <p className="font-medium text-zinc-700">{api.api_name}</p>
                <span className="text-zinc-600">{api.version_name}</span>
              </div>
            </div>
            <span className="text-xs text-gray-500">{api.requests}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default MostPopularAPICard;
