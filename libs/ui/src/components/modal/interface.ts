import { ReactNode } from "react";

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

export type ModalVariant = "simple" | "warning" | "delete";

export interface ConfirmModalProps {
  open: boolean;
  onClose: (open: boolean) => void;
  variant?: ModalVariant;
  title?: string;
  topTitle?: string;
  description?: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
  onConfirm: () => void;
  loading?: boolean;
  icon?: ReactNode;
}
