import { ReactNode } from 'react';
import { ToastOptions } from 'react-toastify';

export interface CustomToastOptions extends ToastOptions {
  description?: string;
  showCloseButton?: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export type ToastTypes = 'info' | 'success' | 'error' | 'warning' | 'loading';

export interface CustomToastProps {
  message: string;
  type: ToastTypes;
  closeToast?: () => void;
  options?: CustomToastOptions;
}

export interface ToastTypeProps {
  icon: ReactNode;
  progressBgColor?: string;
}

export interface LoadingRectangle {
  bgColor: string;
  delay: string;
}

export interface ToastPlaygroundProps {
  type: ToastTypes;
  message: string;
  description?: string;
  showCloseButton?: boolean;
  withAction?: boolean;
  autoClose?: number;
}
