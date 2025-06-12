import { Root } from '@radix-ui/react-switch';
import { ComponentProps } from 'react';
interface switchProps extends ComponentProps<typeof Root> {
  withIcon?: boolean;
  loading?: boolean;
  size?: 'sm' | 'lg';
  variant?: 'primary' | 'secondary';
}
export type { switchProps };
