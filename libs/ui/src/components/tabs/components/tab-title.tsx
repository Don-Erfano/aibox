import clsx from 'clsx';
import type { TabTitleProps } from '../types';

export const TabTitle = ({ children, disabled }: TabTitleProps) => {
  return (
    <p
      className={clsx(
        'group-focus:text-teal-600 group-data-[state=active]:text-teal-600',
        'text-base font-medium inline-block whitespace-nowrap truncate text-ellipsis',
        disabled ? 'text-gray-400' : 'text-zinc-600 hover:text-teal-600'
      )}
    >
      {children}
    </p>
  );
};
