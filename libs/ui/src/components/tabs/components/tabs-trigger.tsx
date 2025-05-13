import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '../../../lib';

export function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        ' group px-6 pt-1 pb-3  h-full data-[state=active]:shadow-none border-b-[2.5px] border-transparent -mb-0.5 data-[state=active]:border-teal-600 transition-all duration-150 focus:outline-none  ',
        className
      )}
      {...props}
    />
  );
}
