import { FC } from 'react';
import { Root, Thumb } from '@radix-ui/react-switch';
import { Check, LoaderCircleIcon, X } from 'lucide-react';
import { switchProps } from './interface';
import { cn } from '../../../lib';
const Switch: FC<switchProps> = ({
  className,
  dir,
  withIcon,
  loading,
  size = 'lg',
  variant = 'primary',
  ...props
}) => {
  return (
    <Root
      data-slot="switch"
      className={cn(
        `peer inline-flex shrink-0 items-center rounded-full border border-transparent shadow-xs transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:border-teal-600 data-[state=unchecked]:bg-gray-500`,
        {
          'h-2.5 w-6': size === 'sm',
          'h-3.5 w-8': size === 'lg',
          'disabled:border-teal-600/32 disabled:!bg-white data-[state=checked]:border-teal-600 data-[state=unchecked]:bg-teal-600':
            variant === 'primary',
        },
        className
      )}
      {...props}
    >
      <Thumb
        data-slot="switch-thumb"
        className={cn(
          `pointer-events-none flex items-center justify-center rounded-full border border-teal-600 bg-background shadow-sm ring-0 transition-transform data-[state=checked]:bg-teal-600 data-[state=unchecked]:border-gray-500 data-[state=unchecked]:[&>#check]:hidden data-[state=checked]:[&>#loading]:text-white data-[state=unchecked]:[&>#loading]:text-gray-500 data-[state=checked]:[&>#x]:hidden`,
          {
            'data-[state=checked]:translate-x-[calc(-100%)] data-[state=unchecked]:translate-x-2':
              dir === 'rtl',
            'data-[state=checked]:translate-x-[calc(100%-8px)] data-[state=unchecked]:-translate-x-full':
              dir === 'ltr',
            'size-3.5': size === 'sm',
            'size-5': size === 'lg',
            '!border-teal-600/50': variant === 'primary' && props.disabled,
          }
        )}
      >
        {loading && (
          <LoaderCircleIcon className="-z-10 animate-spin" id="loading" />
        )}
        {withIcon && !loading && (
          <>
            <Check className="peer -z-10 w-3 text-white" id="check" />
            <X className="-z-10 w-3 text-gray-500" id="x" />
          </>
        )}
      </Thumb>
    </Root>
  );
};
export default Switch;
