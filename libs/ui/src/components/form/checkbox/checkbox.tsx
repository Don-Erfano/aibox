import { Root, Indicator } from '@radix-ui/react-checkbox';
import { CheckIcon, MinusIcon } from 'lucide-react';
import { AIBCheckboxProps } from './interface';
import { cn } from '../../../lib';

export const Checkbox = ({ className, ...props }: AIBCheckboxProps) => {
  return (
    <Root
      data-slot="checkbox"
      className={cn(
        'peer size-4 shrink-0 rounded-[2px] border shadow-xs transition-shadow outline-none',
        'border-zinc-700 hover:border-zinc-800',
        'focus-visible:border-teal-600 focus-visible:ring-[3px] focus-visible:ring-ring/50',
        'data-[state=checked]:border-teal-600 data-[state=checked]:bg-teal-600 data-[state=checked]:text-primary-foreground',
        'data-[state=indeterminate]:border-teal-600 data-[state=indeterminate]:bg-teal-600 data-[state=indeterminate]:text-primary-foreground',
        'dark:data-[state=checked]:bg-teal-600 dark:data-[state=indeterminate]:bg-teal-600',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
        'disabled:cursor-default disabled:opacity-50',
        className
      )}
      {...props}
    >
      <Indicator
        data-slot="checkbox-indicator"
        className="flex items-center justify-center text-current transition-none"
      >
        {props.checked === 'indeterminate' ? (
          <MinusIcon className="size-3.5" />
        ) : (
          <CheckIcon className="size-3.5 text-white" />
        )}
      </Indicator>
    </Root>
  );
};
