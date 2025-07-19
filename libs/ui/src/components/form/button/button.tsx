import { Slot } from '@radix-ui/react-slot';
import { cn } from '../../../lib';
import { buttonProps } from './interface';
import { buttonVariants } from './classes';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../tooltip';
import { Loading } from '../../loading';
import { PropsWithChildren } from 'react';

const Button = ({
  className,
  variant,
  size,
  asChild = false,
  isFilled,
  tooltip,
  loading,
  children,
  ...props
}: PropsWithChildren<buttonProps>) => {
  const Comp = asChild || tooltip ? Slot : 'button';
  const ButtonComponent = () => (
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
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/*@ts-expect-error*/}

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
