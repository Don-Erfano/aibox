import { FC } from 'react';
import { Slot } from '@radix-ui/react-slot';

import { cn } from '../../../lib';
import { buttonProps } from './interface';
import { buttonVariants } from './classes';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import { Loading } from '../../loading';

const Button: FC<buttonProps> = ({
  className,
  variant,
  size,
  asChild = false,
  isFilled,
  tooltip,
  loading,
  children,
  ...props
}) => {
  const Comp = asChild ? Slot : 'button';
  const ButtonComponent: FC = () => (
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
      {...props}
    >
      {loading ? <Loading /> : children}
    </Comp>
  );

  if (tooltip)
    return (
      <Tooltip>
        <TooltipTrigger className="w-auto">
          <ButtonComponent />
        </TooltipTrigger>
        {tooltip && <TooltipContent>{tooltip}</TooltipContent>}
      </Tooltip>
    );

  return <ButtonComponent />;
};

export default Button;
