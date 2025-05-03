import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './styled';

interface ButtonCustomProps {
  title: string;
  asChild: boolean;
  icon: React.ReactNode;
  loading: boolean;
  iconPlacement: 'start' | 'end';
  'data-activated': boolean;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants>,
    Partial<ButtonCustomProps> {}

export interface IconWithTooltipProps {
  title: string;
  icon: React.ReactNode;
}
