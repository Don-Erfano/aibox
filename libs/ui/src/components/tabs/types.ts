import { PropsWithChildren } from 'react';
import {
  TabsProps,
  TabsListProps,
  TabsTriggerProps,
  TabsContentProps,
} from '@radix-ui/react-tabs';

export interface TabType {
  name: string;
  id: string;
  content: React.ReactNode;
  isDisabled: boolean;
}

export interface TabProps {
  tabs: TabType[];
}

export type TabTitleProps = PropsWithChildren<{
  disabled?: boolean;
}>;

export type TabsPropsWithoutClassName = Omit<TabsProps, 'className'>;

export type TabsTriggerPropsWithoutClassName = Omit<
  TabsTriggerProps,
  'className'
>;

export type TabsListPropsWithoutClassName = Omit<TabsListProps, 'className'>;

export type TabsContentPropsWithoutClassName = Omit<
  TabsContentProps,
  'className'
>;
