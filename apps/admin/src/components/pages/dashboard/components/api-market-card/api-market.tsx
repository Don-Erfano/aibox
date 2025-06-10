import { FC } from 'react';

import { Card } from '@/components/cards';
import { useGetApiMarketData } from '@/services';

import { AIIcon } from '../../icons';
import { CardError } from '../error';

const APIMarketCard: FC = () => {
  const { data, error } = useGetApiMarketData();
  if (error?.message) return <CardError />;
  return (
    <Card className="!h-[297px]">
      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-slate-200 p-2 rounded-md">
            <AIIcon />
          </div>
          <p>API مارکت</p>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کاربران در صف
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {data?.api_queue_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کاربران درحال استفاده
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {data?.market_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-zinc-700 leading-12">
              کل APIها
            </p>
            <span className="text-gray-500 text-sm font-medium">
              {data?.market_api_count}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default APIMarketCard;
