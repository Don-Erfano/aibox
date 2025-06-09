import { ReactNode } from 'react';

export interface ModalProps {
  title?: string;
  headerIcon?: ReactNode;
  trigger?: ReactNode;
  children: ReactNode;
  onClose?: () => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}
