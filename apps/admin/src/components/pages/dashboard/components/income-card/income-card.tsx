import { FC } from 'react';
import { DonutChart } from '@aibox/ui';

import { Card } from '@/components/cards';
import { AIIcon, APIIcon, CashIcon, GPUIcon } from '../../icons';
import { useGetIncome } from '@/services/dashboard';

const chartData = [
  { id: '1', name: 'نام API', amount: 35000000 },
  { id: '2', name: 'نام API', amount: 35000000 },
  { id: '3', name: 'نام API', amount: 26000000 },
  { id: '4', name: 'نام API', amount: 30000000 },
];

const IncomeCard: FC = () => {
  const { data } = useGetIncome();
  const incomeData: { [key: string]: string | number } = {
    remain_charge: data?.remain_charge.toLocaleString() || '-',
    total_income: data?.total_income.toLocaleString() || '-',
    ...data?.income_info.reduce((prev, current) => ({
      ...prev,
      [current.title]: current.income.toLocaleString(),
    })),
  };

  console.log(incomeData);
  return (
    <Card
      title="دریافتی‌ها"
      className="order-3 col-span-1 2xl:col-auto md:col-span-2"
      hasMoreOpt
      opt={[
        {
          label: '1',
          value: '1',
        },
      ]}
      handleOptClick={(val) => console.log(val)}
    >
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <DonutChart data={chartData} />
          <div className="flex flex-col w-full">
            <h2 className="text-left text-4xl font-medium  leading-14">
              {incomeData?.total_income?.toLocaleString()}{' '}
              <span className="text-sm font-normal">تومان</span>
            </h2>
            <p className="text-left text-md">مجموع دریافتی‌ها از ابتدا</p>
          </div>
        </div>
        <div className="flex flex-col mt-8 gap-3">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/20 p-2 rounded-md">
                <CashIcon />
              </div>
              <p className="text-sm font-medium leading-6">
                باقیمانده شارژ حساب کاربران
              </p>
            </div>
            <span className="text-sm font-medium">
              {incomeData?.remain_charge} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-orange-100 p-2 rounded-md">
                <GPUIcon />
              </div>
              <p className="text-sm font-medium leading-6">رایانش گرافیکی</p>
            </div>
            <span className="text-sm font-medium">
              {incomeData?.compute} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-slate-200 p-2 rounded-md">
                <AIIcon />
              </div>
              <p className="text-sm font-medium leading-6">استفاده از API</p>
            </div>
            <span className="text-sm font-medium">
              {incomeData.api_buy} تومان
            </span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <div className="bg-teal-600/12 p-2 rounded-md">
                <APIIcon />
              </div>
              <p className="text-sm font-medium leading-6">
                سهم برداشت شده از ارائه‌دهندگان
              </p>
            </div>
            <span className="text-sm font-medium">
              {incomeData.withdraw_bank_account} تومان
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default IncomeCard;
