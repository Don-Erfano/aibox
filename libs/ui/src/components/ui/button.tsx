import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';
import { cn } from '../../lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-white hover:bg-primary/90',
        outline: 'border border-primary text-primary hover:bg-primary/10',
        ghost: 'text-primary hover:bg-primary/10',
        white: 'bg-white text-primary border border-white hover:bg-white/80',
      },
      size: {
        sm: 'h-8 px-4',
        md: 'h-10 px-6',
        lg: 'h-12 px-8',
        icon: 'h-10 w-10 p-0',
      },
      iconPlacement: {
        start: 'flex-row',
        end: 'flex-row-reverse',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: React.ReactNode;
  iconPlacement?: 'start' | 'end';
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconPlacement,
      loading,
      children,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, iconPlacement, className })
        )}
        ref={ref}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading ? (
          <LoaderCircleIcon className="animate-spin size-5" />
        ) : (
          <>
            {icon && <span className="mx-1">{icon}</span>}
            {children}
          </>
        )}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
