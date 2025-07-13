import { FC } from 'react';
import { Root, Thumb } from '@radix-ui/react-switch';
import { Check, LoaderCircleIcon, X } from 'lucide-react';
import { cn } from '../../../lib';
import { switchProps } from './interface';
const Switch: FC<switchProps> = ({
  className,
  dir = 'rtl',
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
        `peer data-[state=checked]:border-teal-600 data-[state=unchecked]:bg-gray-500
 focus-visible:border-ring focus-visible:ring-ring/50
 inline-flex shrink-0 items-center rounded-full border border-transparent
 shadow-xs transition-all outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50`,
        {
          'h-2.5 w-6': size === 'sm',
          'h-3.5 w-8': size === 'lg',
          'data-[state=checked]:border-teal-600 data-[state=unchecked]:bg-teal-600 disabled:!bg-white disabled:border-teal-600/32':
            variant === 'primary',
        },
        className
      )}
      {...props}
    >
      <Thumb
        data-slot="switch-thumb"
        className={cn(
          `bg-background border border-teal-600 data-[state=unchecked]:border-gray-500
 data-[state=checked]:bg-teal-600 pointer-events-none shadow-sm data-[state=unchecked]:[&>#check]:hidden
 data-[state=checked]:[&>#x]:hidden data-[state=checked]:[&>#loading]:text-white data-[state=unchecked]:[&>#loading]:text-gray-500
 rounded-full ring-0 transition-transform flex justify-center items-center`,
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
          <LoaderCircleIcon className="animate-spin -z-10" id="loading" />
        )}
        {withIcon && !loading && (
          <>
            <Check className="w-3 text-white peer -z-10" id="check" />
            <X className="w-3 text-gray-500 -z-10" id="x" />
          </>
        )}
      </Thumb>
    </Root>
  );
};
export default Switch;
