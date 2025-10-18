import { FC } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { buttonVariants } from './classes';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import { Loading } from '../../loading';
import { buttonProps, InnerButtonProps } from './interface';
import { cn } from '../../../lib';

const InnerButton: FC<InnerButtonProps> = ({
  Comp,
  className,
  variant,
  size,
  isFilled,
  loading,
  children,
  type = 'button',
  ...props
}) => {
  return (
    <Comp
      data-slot="button"
      className={cn(
        buttonVariants({
          variant,
          size,
          className,
          isFilled: !loading ? isFilled : false,
        })
      )}
      type={type}
      {...props}
    >
      {loading ? <Loading /> : children}
    </Comp>
  );
};

const Button: FC<buttonProps> = ({
  asChild = false,
  tooltip,
  type = 'button',
  ...props
}) => {
  const Comp = asChild || tooltip ? Slot : 'button';

  if (tooltip) {
    return (
      <Tooltip>
        <TooltipTrigger className="w-auto">
          <InnerButton Comp={Comp} type={type} {...props} />
        </TooltipTrigger>
        <TooltipContent>{tooltip}</TooltipContent>
      </Tooltip>
    );
  }

  return <InnerButton Comp={Comp} type={type} {...props} />;
};

export default Button;
