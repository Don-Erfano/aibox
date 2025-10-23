import { FC } from 'react';

import { Card, AIIcon } from '@aibox/ui';
import { strings } from '@/constant';
import { useGetApiMarketData } from '@/services';

import { CardError } from '../error';
import { InformationSkeleton } from '../sekeltons';

const APIMarketCard: FC = () => {
  const { data, error, isLoading } = useGetApiMarketData();

  if (error?.message) return <CardError />;

  if (isLoading) return <InformationSkeleton />;

  return (
    <Card
      title={
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-slate-200 p-2">
            <AIIcon />
          </div>
          <p>{strings.apiMarket}</p>
        </div>
      }
      className="!h-[297px] bg-white"
    >
      <div className="flex flex-col justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.inQueueUsers}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {data?.api_queue_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.usersCurrentlyUsing}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {data?.market_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm leading-12 font-medium text-zinc-700">
              {strings.totalApis}
            </p>
            <span className="text-sm font-medium text-gray-500">
              {data?.market_api_count}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default APIMarketCard;
