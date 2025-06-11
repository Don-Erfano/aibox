import { Content } from '@radix-ui/react-tabs';
import type { TabsContentPropsWithoutClassName } from '../types';

export const TabsContent: React.FC<TabsContentPropsWithoutClassName> = ({
  ...props
}) => {
  return (
    <Content
      data-slot="tabs-content"
      className="flex-1 outline-none"
      {...props}
    />
  );
};
