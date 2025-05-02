import { VariantProps } from 'class-variance-authority';
import { buttonVariants } from './button';

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
