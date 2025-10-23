import { FC, ReactNode } from 'react';
import clsx from 'clsx';
import { strings } from '@/constant';

const titleClasses = 'truncate text-sm leading-6 font-medium text-zinc-700';
const DescriptionClasses = 'truncate text-xs leading-5 text-zinc-600';
const incomeClasses = (isPositive: boolean) =>
  clsx('truncate text-sm font-medium text-gray-500', {
    'text-red-500': !isPositive,
  });

const ListTemp: FC<{
  icon: ReactNode;
  title: string;
  description: string;
  income: number;
}> = ({ icon, title, description, income }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="rounded-md bg-slate-200 p-2">{icon}</div>
      <div className="flex flex-col gap-1">
        <span className={titleClasses}>{title}</span>
        <span className={DescriptionClasses}>{description}</span>
      </div>
    </div>
    <div className={incomeClasses(income >= 0)}>
      <span dir="ltr">{income.toLocaleString()}</span>{' '}
      <span>{strings.toman}</span>
    </div>
  </div>
);

export default ListTemp;
