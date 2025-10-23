'use client';

import { FC } from 'react';

import { strings } from '@/constant';
import { useGetIncome } from '@/services';
import { Card, DonutChart } from '@aibox/ui';

import ListTemp from './list-item';
import { normalizedData } from './constants';
import { AnalysisSkeleton } from '../sekeltons';

import { useCardFilter } from '../../constants';
import clsx from 'clsx';

const IncomeCard: FC = () => {
  const { filter, ...rest } = useCardFilter();
  const { data: incomeData, isLoading } = useGetIncome(filter);
  const { chartData, dataTemp } = normalizedData(incomeData);
  const filterRanges: Record<string, string> = {
    weekly: strings.inPrevWeek,
    yearly: strings.inPrevYear,
    monthly: strings.inPrevMonth,
  };

  if (isLoading)
    return (
      <Card
        title={strings.incomes}
        className="col-span-1 flex justify-start !gap-8 bg-white md:col-span-2 xl:col-span-1 2xl:col-auto"
      >
        <AnalysisSkeleton />
      </Card>
    );

  return (
    <Card
      title={strings.incomes}
      className="col-span-1 flex justify-start !gap-8 bg-white md:col-span-2 xl:col-span-1 2xl:col-auto"
      {...rest}
    >
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <DonutChart
            data={chartData}
            total={{
              value: Number(incomeData?.growth_rate || 0),
              suffix: rest.filterLabel,
            }}
          />
          <div className="flex w-full flex-col justify-center">
            <h2
              className={clsx(
                'text-left text-4xl leading-14 font-medium text-zinc-700',
                {
                  '!text-red-500': Number(incomeData?.total_income) < 0,
                }
              )}
            >
              <span dir="ltr">
                {incomeData?.total_income?.toLocaleString() || 0}
              </span>{' '}
              <span className="text-sm font-normal text-zinc-700">
                {strings.toman}
              </span>
            </h2>
            <p className="text-md text-left text-zinc-700">
              {strings.totalIncome} {filterRanges[filter]}
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          {dataTemp.map((props, index) => (
            <ListTemp {...props} key={index} />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default IncomeCard;
