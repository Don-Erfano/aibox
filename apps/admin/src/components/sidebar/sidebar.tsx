import { Button } from '@aibox/ui';
import { SidebarProps } from './types';

export const Sidebar = (props: SidebarProps) => {
  const { setIsOpen, isOpen } = props;
  return (
    <div className="flex flex-col justify-between max-[905px]:hidden">
      <Button
        onClick={() => setIsOpen((open: boolean) => !open)}
        variant="secondary"
      >
        Its {isOpen ? 'open' : 'close'}
      </Button>
      Sidebar
    </div>
  );
};
