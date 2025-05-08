import { AppSidebar } from '@aibox/ui';
import { SidebarProps } from './types';
import { cn } from '../../../../../libs/ui/src/lib/utils';

export const Sidebar = () =>
  // props: SidebarProps
  {
    // const { setIsOpen, isOpen } = props;
    return (
      <div className="flex flex-col justify-between">
        <AppSidebar className={cn('bg-amber-800')} />
      </div>
    );
  };
