import { cn } from '../../../lib';
import { TabTitleProps } from '../types';

export function TabTitle({ children, className }: TabTitleProps) {
  return (
    <p
      className={cn(
        'rounded-sm group-focus:text-teal-600 group-data-[state=active]:text-teal-600  text-base font-medium inline-block whitespace-nowrap truncate text-ellipsis max-w-full',
        className
      )}
    >
      {children}
    </p>
  );
}
