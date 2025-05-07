import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './style';

interface ICustomProps {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loading?: boolean;
}

type TButtonProps = React.ComponentProps<'button'> &
  ICustomProps &
  VariantProps<typeof buttonVariants>;

export type { TButtonProps };
