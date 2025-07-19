import { Root } from '@radix-ui/react-tabs';
import type { TabsPropsWithoutClassName } from '../types';

export const Tabs = ({ ...props }: TabsPropsWithoutClassName) => {
  return (
    <Root data-slot="tabs" className="flex flex-col gap-2 w-full " {...props} />
  );
};
