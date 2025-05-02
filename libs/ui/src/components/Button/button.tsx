import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';

import { cn } from '../../lib/utils';

import { ButtonProps } from './types';
import { buttonVariants } from './styled';
import { IconWithTooltip } from './iconWithTooltip';

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const {
      className,
      variant,
      icon,
      iconPlacement = 'end',
      loading,
      title,
      isFilled,
      children,
      size,
      disabled,
      ...rest
    } = props;

    return (
      <button
        dir="rtl"
        className={cn(
          'relative',
          buttonVariants({ variant, className, isFilled, size })
        )}
        ref={ref}
        disabled={loading || disabled}
        {...rest}
      >
        {loading && <LoaderCircleIcon className="absolute animate-spin" />}

        <span
          className={cn(
            'flex justify-center items-center gap-2',
            loading && 'invisible',
            iconPlacement === 'start' ? 'flex-row' : 'flex-row-reverse'
          )}
        >
          {variant === 'icon' ? (
            title ? (
              <IconWithTooltip title={title} icon={icon} />
            ) : (
              icon
            )
          ) : (
            <>
              {icon}
              {children ?? (
                <span className="text-base font-medium">{title}</span>
              )}
            </>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
