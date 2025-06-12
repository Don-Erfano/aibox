import { IUserApiPackageDetail } from '@/services';

export const RowChild = ({ row }: { row: IUserApiPackageDetail }) => {
  return (
    <div className="grid grid-cols-3 gap-x-24 gap-y-6 px-14 py-5 ">
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between mb-2">
          <p className="text-zinc-600 text-sm">زمان باقی‌مانده</p>
          <p className="text-teal-600 text-sm">15 روز</p>
        </div>
        <div className="w-full h-1 bg-gray-300 rounded-full">
          <div className="w-1/2 h-1 bg-teal-600 rounded-full mr-auto" />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-xs">30</span>
          <span className="text-gray-500 text-xs">0</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between mb-2">
          <p className="text-zinc-600 text-sm">
            تعداد فراخوانی ماهانه باقی‌مانده
          </p>
          <p className="text-teal-600 text-sm">50</p>
        </div>
        <div className="w-full h-1 bg-gray-300 rounded-full">
          <div className="w-1/2 h-1 bg-teal-600 rounded-full mr-auto" />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-xs">100</span>
          <span className="text-gray-500 text-xs">0</span>
        </div>
      </div>
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between mb-2">
          <p className="text-zinc-600 text-sm">
            تعداد فراخوانی روزانه باقی‌مانده
          </p>
          <p className="text-teal-600 text-sm">10</p>
        </div>
        <div className="w-full h-1 bg-gray-300 rounded-full">
          <div className="w-1/2 h-1 bg-teal-600 rounded-full mr-auto" />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500 text-xs">20</span>
          <span className="text-gray-500 text-xs">0</span>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-zinc-700 text-sm">قیمت: 920 تومان</p>
        <p className="text-zinc-700 text-sm">تاریخ اتمام بسته: 1401/04/04</p>
        <p className="text-zinc-700 text-sm">
          تعداد فراخوانی انجام شده: 224 عدد
        </p>
      </div>
    </div>
  );
};
