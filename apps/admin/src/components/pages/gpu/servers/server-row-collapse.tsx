import { FC } from 'react';

const CollapseRow: FC = () => (
  <div className="w-full flex flex-col gap-3 px-4 py-5">
    <div className="flex justify-between">
      <p className="text-sm text-slate-950">زمان درخواست:</p>
      <p className="text-zinc-700 text-sm">1402/01/27 13:36</p>
    </div>
    <div className="flex justify-between">
      <p className="text-sm text-slate-950">زمان تخصیص:</p>
      <p className="text-zinc-700 text-sm">1402/01/27 13:36</p>
    </div>
    <div className="flex justify-between">
      <p className="text-sm text-slate-950">مدت زمان استفاده:</p>
      <p className="text-zinc-700 text-sm">1:22</p>
    </div>
    <div className="flex justify-between">
      <p className="text-sm text-slate-950">هزینه استفاده(تومان):</p>
      <p className="text-zinc-700 text-sm">2,000</p>
    </div>
  </div>
);

export default CollapseRow;
