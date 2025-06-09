import { FC } from 'react';

import { DonutChart } from '@aibox/ui';

import { Card } from '@/components/cards';
import { useGetApiPlatformData } from '@/services';
import { APIIcon } from '../../icons';

const ApiPlatformCard: FC = () => {
  const { data, isFetching } = useGetApiPlatformData();
  const waiting = data?.version_info.find((v) => v.status === 'WAITING')?.count;
  const accepted = data?.version_info.find(
    (v) => v.status === 'ACCEPTED'
  )?.count;
  const deprecated = data?.version_info.find(
    (v) => v.status === 'DEPRECATED'
  )?.count;
  const notAccepted = data?.version_info.find(
    (v) => v.status === 'NOT_ACCEPTED'
  )?.count;

  const chartData = [
    { id: '1', name: 'تایید شده', amount: accepted || 0 },
    { id: '2', name: 'در انتظار تایید', amount: waiting || 0 },
    { id: '3', name: 'مردود', amount: notAccepted || 0 },
    { id: '4', name: 'منقضی', amount: deprecated || 0 },
  ];
  const colors = ['#34B853', '#DD4B39', '#B00020', '#757E7F'];

  return (
    <Card title="کاربران فعال" className="justify-start h-fit">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <DonutChart data={chartData} loading={isFetching} colors={colors} />
          {isFetching ? (
            <div className="bg-gray-100 animate-pulse w-[200px] h-[80px] rounded-md" />
          ) : (
            <div className="flex flex-col w-fit">
              <h2 className="text-4xl font-medium leading-14 text-left text-zinc-700">
                {data?.total_count}
              </h2>
              <span className="text-sm font-normal text-zinc-700">
                کل ورژن‌ها از ابتدا
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-8 gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 text-green-600 p-2 rounded-md">
                <APIIcon />
              </div>
              <p className="text-zinc-700 text-sm font-medium">تأیید شده</p>
            </div>
            {isFetching ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {accepted}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 text-orange-700 p-2 rounded-md">
                <APIIcon />
              </div>
              <p className="text-zinc-700 text-sm font-medium">
                در انتظار تأیید
              </p>
            </div>
            {isFetching ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {waiting}
              </span>
            )}
          </div>
          <div className="flex justify-between  items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 text-red-600 p-2 rounded-md">
                <APIIcon />
              </div>
              <p className="text-zinc-700 text-sm font-medium">مردود</p>
            </div>
            {isFetching ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {notAccepted}
              </span>
            )}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 text-gray-500 p-2 rounded-md">
                <APIIcon />
              </div>
              <p className="text-zinc-700 text-sm font-medium">منقضی</p>
            </div>
            {isFetching ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span className="text-gray-500 text-sm font-medium">
                {deprecated}
              </span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ApiPlatformCard;
