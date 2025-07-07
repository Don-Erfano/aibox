import { PropsWithChildren, ReactNode } from 'react';

interface IFormContainer extends PropsWithChildren {
  title: string;
  onDelete?: (id?: string | string[] | number) => void;
  customActions?: {
    icon: ReactNode;
    onClick: () => void;
    tooltip: string;
  }[];
}

export type { IFormContainer };
