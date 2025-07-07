import { FC } from 'react';
import { DonutChart } from '@aibox/ui';

import { strings } from '@/constant';
import { Card } from '@/components/cards';
import { useGetUserCount } from '@/services/dashboard';

import { CardError } from '../error';
import { AIIcon, APIIcon, GPUIcon, UsersIcon } from '../../icons';

const ActiveUserCard: FC = () => {
  const { data, isLoading, error } = useGetUserCount();

  const chartData = [
    {
      id: '1',
      name: strings.gpuComputing,
      amount: Number(data?.data.gpu_user_count),
    },
    {
      id: '2',
      name: strings.platform,
      amount: Number(data?.data.platform_user_count),
    },
    {
      id: '3',
      name: strings.apiMarket,
      amount: Number(data?.data.market_user_count),
    },
    {
      id: '4',
      name: strings.common,
      amount: Number(data?.data.common_user_count),
    },
  ];

  if (error?.message) return <CardError />;
  return (
    <Card
      title={strings.activeUsers}
      className="order-2 2xl:order-1 col-span-1 2xl:col-auto md:col-span-2 xl:col-span-1 flex justify-start !gap-8"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <DonutChart
            data={chartData}
            loading={isLoading}
            total={{
              value: `${Math.abs(Number(data?.data.monthly_growth_rate))}%`,
              suffix:
                Number(data?.data.monthly_growth_rate) >= 0
                  ? strings.increase
                  : strings.decrease,
            }}
          />
          {isLoading ? (
            <div className="bg-gray-100 animate-pulse w-[200px] h-[80px] rounded-md" />
          ) : (
            <div className="flex flex-col w-fit">
              <h2 className="text-left text-4xl font-medium text-zinc-700 leading-14">
                {data?.data.all_user_count}
                <span className="text-sm text-zinc-700 font-normal">
                  {' '}
                  {strings.user}
                </span>
              </h2>
              <p className="text-center text-md text-zinc-700 font-normal">
                {Math.abs(Number(data?.data.monthly_growth_rate))}{' '}
                {Number(data?.data.monthly_growth_rate) >= 0
                  ? strings.increase
                  : strings.decrease}{' '}
                {strings.compareToLastMonth}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-8 gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-orange-100 p-2 rounded-md">
                <GPUIcon />
              </div>
              <p className="text-zinc-700 font-medium text-sm">
                {strings.gpuComputingUsers}
              </p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {data?.data.gpu_user_count}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 p-2 rounded-md text-teal-600">
                <APIIcon />
              </div>
              <p className="text-zinc-700 font-medium text-sm">
                {strings.platformUsers}
              </p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {data?.data.platform_user_count}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-slate-200 p-2 rounded-md">
                <AIIcon />
              </div>
              <p className="text-zinc-700 font-medium text-sm">
                {strings.apiMarketUsers}
              </p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {data?.data.market_user_count}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/20 p-2 rounded-md">
                <UsersIcon />
              </div>
              <p className="text-zinc-700 font-medium text-sm">
                {strings.commonUsers}
              </p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {data?.data.common_user_count}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActiveUserCard;
