import * as TabsPrimitive from '@radix-ui/react-tabs';
import { TabsListPropsWithoutClassName } from '../types';

export function TabsList({ ...props }: TabsListPropsWithoutClassName) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className="flex  items-center  w-full p-0   border-b-[2.5px]  border-b-gray-100  justify-start  gap-4 lg:gap-6 "
      {...props}
    />
  );
}
