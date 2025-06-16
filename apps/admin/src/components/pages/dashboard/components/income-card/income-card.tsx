import { FC } from 'react';
import { DonutChart } from '@aibox/ui';

import { Card } from '@/components/cards';
import { AIIcon, APIIcon, CashIcon, GPUIcon } from '../../icons';
import { useGetIncome } from '@/services/dashboard';

const IncomeCard: FC = () => {
  const { data } = useGetIncome();
  const incomeData: { [key: string]: string | number } = {
    remain_charge: data?.remain_charge || '-',
    total_income: data?.total_income || '-',
    ...data?.income_info.reduce((prev, current) => ({
      ...prev,
      [current.title]: current.income,
    })),
  };

  const chartData = [
    { id: '1', name: 'باقی مانده شارژ', amount: +incomeData.remain_charge },
    { id: '2', name: 'رایانش گرافیکی', amount: +incomeData.compute },
    { id: '3', name: 'استفاده از api', amount: +incomeData.api_buy },
    { id: '4', name: 'برداشت شده', amount: +incomeData.withdraw_bank_account },
  ];

  return (
    <Card
      title="دریافتی‌ها"
      className="order-3 col-span-1 2xl:col-auto md:col-span-2  flex justify-start !gap-8"
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <DonutChart data={chartData} />
          <div className="flex flex-col w-full">
            <h2 className="text-left text-4xl font-medium leading-14 text-zinc-700">
              {incomeData?.total_income?.toLocaleString()}{' '}
              <span className="text-sm font-normal text-zinc-700">تومان</span>
            </h2>
            <p className="text-left text-md text-zinc-700">
              مجموع دریافتی‌ها از ابتدا
            </p>
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/20 p-2 rounded-md">
                <CashIcon />
              </div>
              <p className="text-sm font-medium leading-6 text-zinc-700">
                باقیمانده شارژ حساب کاربران
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {incomeData?.remain_charge?.toLocaleString()} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-orange-100 p-2 rounded-md">
                <GPUIcon />
              </div>
              <p className="text-sm font-medium leading-6 text-zinc-700">
                رایانش گرافیکی
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {incomeData?.compute?.toLocaleString()} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-slate-200 p-2 rounded-md">
                <AIIcon />
              </div>
              <p className="text-sm font-medium leading-6 text-zinc-700">
                استفاده از API
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {incomeData.api_buy?.toLocaleString()} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 p-2 rounded-md text-teal-600">
                <APIIcon />
              </div>
              <p className="text-sm font-medium leading-6 text-zinc-700">
                سهم برداشت شده از ارائه‌دهندگان
              </p>
            </div>
            <span className="text-sm font-medium text-gray-500">
              {incomeData.withdraw_bank_account?.toLocaleString()} تومان
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IncomeCard;
