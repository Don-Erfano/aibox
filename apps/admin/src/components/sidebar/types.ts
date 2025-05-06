import { Dispatch, SetStateAction } from 'react';

export interface SidebarProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
}
