import { PropsWithChildren } from 'react';
import {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from '@radix-ui/react-tabs';

interface TabType {
  name: string;
  id: string;
  content: React.ReactNode;
  isDisabled?: boolean;
}

interface TabProps {
  tabs: TabType[];
}

type TabTitleProps = PropsWithChildren<{
  disabled?: boolean;
}>;

type TabsPropsWithoutClassName = Omit<TabsProps, 'className'>;

type TabsTriggerPropsWithoutClassName = Omit<TabsTriggerProps, 'className'>;

type TabsListPropsWithoutClassName = Omit<TabsListProps, 'className'>;

type TabsContentPropsWithoutClassName = Omit<TabsContentProps, 'className'>;

export type {
  TabType,
  TabProps,
  TabTitleProps,
  TabsPropsWithoutClassName,
  TabsTriggerPropsWithoutClassName,
  TabsListPropsWithoutClassName,
  TabsContentPropsWithoutClassName,
};
