import { Trigger } from '@radix-ui/react-tabs';
import { TabsTriggerPropsWithoutClassName } from '../types';

export const TabsTrigger: React.FC<TabsTriggerPropsWithoutClassName> = ({
  disabled,
  ...props
}) => {
  return (
    <Trigger
      data-slot="tabs-trigger"
      className={`group px-6 pt-1 pb-3 h-full data-[state=active]:shadow-none border-b-[2.5px] border-transparent -mb-0.5 data-[state=active]:border-teal-600 transition-all duration-150 focus:outline-none ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
      {...props}
    />
  );
};
