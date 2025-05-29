import { NoDataIcon } from '@aibox/ui';

export const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NoDataIcon />
      <p className="text-sm">موردی یافت نشد.</p>
    </div>
  );
};
