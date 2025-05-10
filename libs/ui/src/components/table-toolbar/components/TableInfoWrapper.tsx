import clsx from 'clsx';

import { TableInfoWrapperProps } from '../types';

export const TableInfoWrapper = ({
  title,
  totalItems,
}: TableInfoWrapperProps) => {
  const isSmallerThan100 = totalItems < 100;

  return (
    <div className="flex items-center gap-1 leading-h6">
      <span className="text-h5 font-medium text-[#002120]">{title}</span>
      <span
        className={clsx(
          'flex size-6 items-center justify-center rounded-full bg-[#002120] text-h5 font-medium text-white',
          {
            'size-7': !isSmallerThan100,
          }
        )}
      >
        {isSmallerThan100 ? totalItems : '+99'}
      </span>
    </div>
  );
};
