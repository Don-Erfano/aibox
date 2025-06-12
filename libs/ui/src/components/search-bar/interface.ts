import { ReactNode } from 'react';

export interface SearchBarProps {
  value: string;
  onValueChange: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export type IconState = 'loading' | 'search' | 'searchHover' | 'clear' | 'none';

export type IconRecord = Record<
  IconState,
  { icon: ReactNode; onClick?: () => void }
>;
