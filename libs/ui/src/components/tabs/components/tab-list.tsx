import { List } from '@radix-ui/react-tabs';
import type { TabsListPropsWithoutClassName } from '../types';

export const TabsList: React.FC<TabsListPropsWithoutClassName> = ({
  ...props
}) => {
  return (
    <List
      data-slot="tabs-list"
      className="flex items-center w-full border-b-[2.5px] border-b-gray-100 gap-4 lg:gap-6 "
      {...props}
    />
  );
};
