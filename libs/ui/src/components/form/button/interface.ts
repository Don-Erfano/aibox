import { ComponentProps } from 'react';
import { VariantProps } from 'class-variance-authority';

import { buttonVariants } from './classes';

type buttonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    tooltip?: string;
    loading?: boolean;
  };

export type { buttonProps };
