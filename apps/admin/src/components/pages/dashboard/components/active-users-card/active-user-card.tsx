import { FC } from 'react';

import {
  AIIcon,
  APIIcon,
  Card,
  DonutChart,
  GPUIcon,
  UsersIcon,
} from '@aibox/ui';
import { useGetUserCount } from '@/services';

import { strings } from '@/constant';

import { CardError } from '../error';
import { AnalysisSkeleton } from '../sekeltons';

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

  if (isLoading)
    return (
      <Card
        title={strings.activeUsers}
        className="col-span-1 flex justify-between !gap-8 md:col-span-2 xl:col-span-1 2xl:col-auto"
      >
        <AnalysisSkeleton />
      </Card>
    );

  return (
    <Card
      title={strings.activeUsers}
      className="col-span-1 flex justify-between !gap-8 bg-white md:col-span-2 xl:col-span-1 2xl:col-auto"
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <DonutChart
            data={chartData}
            loading={isLoading}
            total={{
              value: Number(data?.data.monthly_growth_rate),
              suffix: 'در ماه گذشته',
            }}
          />

          <div className="flex w-fit flex-col">
            <h2 className="text-left text-4xl leading-14 font-medium text-zinc-700">
              {data?.data.all_user_count}
              <span className="text-sm font-normal text-zinc-700">
                {' '}
                {strings.user}
              </span>
            </h2>
            <p className="text-md text-center font-normal text-zinc-700">
              {Math.abs(Number(data?.data.monthly_growth_rate))}{' '}
              {Number(data?.data.monthly_growth_rate) >= 0
                ? strings.increase
                : strings.decrease}{' '}
              {strings.compareToLastMonth}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-orange-100 p-2">
                <GPUIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.gpuComputingUsers}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {data?.data.gpu_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/12 p-2 text-teal-600">
                <APIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.platformUsers}
              </p>
            </div>

            <span className="text-sm font-medium text-gray-500">
              {data?.data.platform_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-slate-200 p-2">
                <AIIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.apiMarketUsers}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {data?.data.market_user_count}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="rounded-md bg-teal-600/20 p-2">
                <UsersIcon />
              </div>
              <p className="text-sm leading-12 font-medium text-zinc-700">
                {strings.commonUsers}
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {data?.data.common_user_count}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActiveUserCard;
