import { Trigger } from '@radix-ui/react-tabs';
import { TabsTriggerPropsWithoutClassName } from '../types';
import clsx from 'clsx';

export const TabsTrigger: React.FC<TabsTriggerPropsWithoutClassName> = ({
  disabled,
  ...props
}) => {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={clsx(
        'group px-6 pt-1 pb-3 h-full border-b-[2.5px] border-transparent -mb-0.5 transition-all duration-150 focus:outline-none',
        'data-[state=active]:shadow-none data-[state=active]:border-teal-600',
        disabled ? 'cursor-default' : 'cursor-pointer'
      )}
      disabled={disabled}
      {...props}
    />
  );
};
