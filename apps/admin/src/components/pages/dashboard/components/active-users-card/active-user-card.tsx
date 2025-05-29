import { FC } from 'react';
import { DonutChart } from '@aibox/ui';

import { Card } from '@/components/cards';
import { useGetUserCount } from '@/services/dashboard';

import { CardError } from '../error';
import { AIIcon, APIIcon, GPUIcon, UsersIcon } from '../../icons';

const chartData = [
  { id: '1', name: 'نام API', amount: 35000000 },
  { id: '2', name: 'نام API', amount: 35000000 },
  { id: '3', name: 'نام API', amount: 26000000 },
  { id: '4', name: 'نام API', amount: 30000000 },
];

const ActiveUserCard: FC = () => {
  const { data, isLoading, error } = useGetUserCount();
  if (error?.message) return <CardError />;
  return (
    <Card
      title="کاربران فعال"
      className="order-2 2xl:order-1 col-span-1 2xl:col-auto md:col-span-2"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <DonutChart
            data={chartData}
            loading={isLoading}
            total={{
              value: String(Math.abs(Number(data?.data.monthly_growth_rate))),
              suffix:
                Number(data?.data.monthly_growth_rate) >= 0 ? 'رشد' : 'کاهش',
            }}
          />
          {isLoading ? (
            <div className="bg-gray-100 animate-pulse w-[200px] h-[80px] rounded-md" />
          ) : (
            <div className="flex flex-col w-fit">
              <h2 className="text-center text-4xl font-medium leading-14">
                {data?.data.all_user_count}
                <span className="text-sm font-normal">کاربر</span>
              </h2>
              <p className="text-center text-md">
                {Math.abs(Number(data?.data.monthly_growth_rate))}{' '}
                {Number(data?.data.monthly_growth_rate) >= 0 ? 'رشد' : 'کاهش'}{' '}
                نسبت به ماه گذشته
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col mt-8 gap-3">
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="bg-orange-100 p-2 rounded-md">
                <GPUIcon />
              </div>
              <p>کاربران رایانش گرافیکی</p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span>{data?.data.gpu_user_count}</span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 p-2 rounded-md">
                <APIIcon />
              </div>
              <p>کاربران پلتفرم</p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span>{data?.data.platform_user_count}</span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="bg-slate-200 p-2 rounded-md">
                <AIIcon />
              </div>
              <p>کاربران API مارکت</p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span>{data?.data.market_user_count}</span>
            )}
          </div>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/20 p-2 rounded-md">
                <UsersIcon />
              </div>
              <p>کاربران مشترک</p>
            </div>
            {isLoading ? (
              <span className="bg-gray-100 animate-pulse w-6 h-8 rounded-md" />
            ) : (
              <span>{data?.data.common_user_count}</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ActiveUserCard;
