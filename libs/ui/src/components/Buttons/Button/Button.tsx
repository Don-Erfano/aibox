import { LoaderCircleIcon } from 'lucide-react';
import React from 'react';

import { cn } from '../../../lib/utils';

import { ButtonProps } from './interface';
import { buttonVariants } from './styled';
import {
  TooltipProvider,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '../../ui/tooltip';

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
              <TooltipProvider>
                <Tooltip delayDuration={300}>
                  <TooltipTrigger asChild>{icon}</TooltipTrigger>
                  <TooltipContent
                    className="bg-zinc-800 text-stone-50 border-0 rounded-sm"
                    align="center"
                    sideOffset={12}
                  >
                    <TooltipArrow className="-my-px w-[7px] h-[5.5px] fill-zinc-800" />
                    <p>{title}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
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

export default Button;
