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
        ' group px-7 pt-0.5 pb-3.5  h-full data-[state=active]:shadow-none border-b-[2.5px] border-transparent -mb-0.5 data-[state=active]:border-teal-600 transition-all duration-150 focus:outline-none',
        className
      )}
      {...props}
    />
  );
}
// data-[state=active]:bg-background dark:data-[state=active]:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-foreground dark:text-muted-foreground inline-flex  flex-1 items-center justify-center gap-1.5 rounded-md border  py-1 text-sm font-medium whitespace-nowrap focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
