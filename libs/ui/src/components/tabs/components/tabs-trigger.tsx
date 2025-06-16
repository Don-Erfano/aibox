import { Trigger } from '@radix-ui/react-tabs';
import type { TabsTriggerPropsWithoutClassName } from '../types';
import clsx from 'clsx';

export const TabsTrigger: React.FC<TabsTriggerPropsWithoutClassName> = ({
  disabled,
  ...props
}) => {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={clsx(
        'group px-7 pt-0.5 pb-1 h-full border-b-[2.5px] border-transparent -mb-0.5 transition-all duration-150 focus:outline-none cursor-pointer ',
        'data-[state=active]:shadow-none data-[state=active]:border-teal-600',
        { '!cursor-default ': disabled }
      )}
      disabled={disabled}
      {...props}
    />
  );
};
