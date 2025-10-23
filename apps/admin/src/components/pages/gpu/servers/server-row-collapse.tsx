import { formatJalali } from '@aibox/ui';
import { FC } from 'react';

const CollapseRow: FC = ({ row }: any) => {
  return (
    <div className="flex w-full flex-col gap-3 md:px-4 md:py-5">
      <div className="flex justify-between">
        <p className="text-sm text-slate-950">زمان درخواست:</p>
        <p className="text-sm text-zinc-700">
          {row.created_at ? formatJalali(row.created_at) : '-'}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-slate-950">زمان تخصیص:</p>
        <p className="text-sm text-zinc-700">
          {row.reservation_time ? formatJalali(row.reservation_time) : '-'}
        </p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-slate-950">مدت زمان استفاده:</p>
        <p className="text-sm text-zinc-700">{row.usage_time || '-'}</p>
      </div>
      <div className="flex justify-between">
        <p className="text-sm text-slate-950">هزینه استفاده(تومان):</p>
        <p className="text-sm text-zinc-700">{row.usage_cost || '-'}</p>
      </div>
    </div>
  );
};
export default CollapseRow;
