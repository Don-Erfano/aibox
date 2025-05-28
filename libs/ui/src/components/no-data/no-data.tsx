import { NoDataIcon } from '../icons';

export const NoData = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <NoDataIcon />
      <p className="text-sm text-zinc-600">موردی یافت نشد.</p>
    </div>
  );
};
