import { useEffect, useState } from 'react';
import { AreaChart, SemiCircleChart, ToggleGroup } from '@aibox/ui';

import { Card } from '@/components/cards';
import { useGetChartData } from '@/services';

const NewUsersCard = () => {
  const [filter, setFilter] = useState<'yearly' | 'monthly' | 'weekly'>(
    'weekly'
  );

  const persianFilter = {
    weekly: 'هفته',
    monthly: 'ماه',
    yearly: 'سال',
  };

  const toogleItems = [
    { label: 'هفتگی', value: 'weekly' },
    { label: 'ماهانه', value: 'monthly' },
    { label: 'سالانه', value: 'yearly' },
  ];

  const { data, refetch, isFetching, isPending } = useGetChartData(filter);

  useEffect(() => {
    refetch();
  }, [filter, refetch]);

  enum EColors {
    '#0D9488',
    '#C2410C',
    '#A21CAF',
  }

  const ChartData = data?.user_count_data.map((user, i) => ({
    name: user.domain,
    data: user.user_count,
    color: EColors[i],
  }));

  return (
    <Card
      title="کاربران جدید"
      className="order:1 2xl:order-2 col-span-2 2xl:col-span-1 relative min-h-[488px]"
    >
      <div className="absolute top-6 left-6">
        <ToggleGroup
          items={toogleItems}
          onValueChange={(e) => {
            setFilter((prev) =>
              e ? (e as 'yearly' | 'monthly' | 'weekly') : prev
            );
          }}
          value={filter}
        />
      </div>
      <div className="flex flex-wrap lg:flex-nowrap">
        <AreaChart
          data={ChartData || []}
          horizontalCategories={data?.dates}
          height={400}
          className="lg:-mt-10 lg:order-1 order-2 pt-4 lg:pt-0"
        />
        <div className="lg:border-r border-b pb-6 w-full lg:min-w-[252px] lg:w-fit pr-6 flex flex-row lg:flex-col gap-8 lg:order-2 order-1 sm:gap-8">
          <div className="flex flex-col items-center gap-3">
            <SemiCircleChart
              isLoading={isFetching || isPending}
              data={data?.growth_rate || 0}
              label={String(data?.growth_rate) + '%'}
            />
            <span className="text-center text-sm">
              {Math.abs(Number(data?.growth_rate))}
              {'% '}
              {Number(data?.growth_rate) > 0 ? 'رشد' : 'کاهش'} نسبت به{' '}
              {persianFilter[filter]} گذشته
            </span>
          </div>
          <div className="flex flex-col gap-3 w-full">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-zinc-700">کاربران جدید</p>
              <span className="text-sm text-gray-500">
                {data?.new_user_count}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-zinc-700">پروداکشن</p>
              <span className="text-sm text-gray-500">
                {data?.domain_user_count[0].user_count}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-zinc-700">زنجان</p>
              <span className="text-sm text-gray-500">
                {data?.domain_user_count[1].user_count}
              </span>
            </div>
            <div className="border border-dashed" />
            <div className="flex justify-between">
              <p className="text-sm font-medium text-zinc-700">کاربران فعال</p>
              <span className="text-sm text-gray-500">
                {data?.active_user_count}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-sm font-medium text-zinc-700">کل کاربران</p>
              <span className="text-sm text-gray-500">
                {data?.all_user_count}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default NewUsersCard;
