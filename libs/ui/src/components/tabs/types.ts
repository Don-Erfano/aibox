import * as TabsPrimitive from '@radix-ui/react-tabs';

export interface Tab {
  name: string;
  id: string;
  content: React.ReactNode;
  isDisabled: boolean;
}

export interface TabProps {
  tabs: Tab[];
}

export interface TabTitleProps {
  children: React.ReactNode;
  className?: string;
}

type TabsPrimitiveRootProps = React.ComponentProps<typeof TabsPrimitive.Root>;

export type TabsPropsWithoutClassName = Omit<
  TabsPrimitiveRootProps,
  'className'
>;

type TabsTriggerPrimitiveRootProps = React.ComponentProps<
  typeof TabsPrimitive.Trigger
>;

export type TabsTriggerPropsWithoutClassName = Omit<
  TabsTriggerPrimitiveRootProps,
  'className'
>;

type TabsPrimitiveListProps = React.ComponentProps<typeof TabsPrimitive.List>;

export type TabsListPropsWithoutClassName = Omit<
  TabsPrimitiveListProps,
  'className'
>;
