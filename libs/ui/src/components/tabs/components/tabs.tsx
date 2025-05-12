import * as TabsPrimitive from '@radix-ui/react-tabs';
import { TabsPropsWithoutClassName } from '../types';

export function Tabs({ ...props }: TabsPropsWithoutClassName) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className="flex flex-col gap-2 w-full "
      {...props}
    />
  );
}
