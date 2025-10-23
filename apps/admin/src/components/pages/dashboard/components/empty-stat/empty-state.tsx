import { NoDataIcon } from '@aibox/ui';

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <NoDataIcon />
      <p className="text-sm text-zinc-600">موردی یافت نشد.</p>
    </div>
  );
};

export default EmptyState;
