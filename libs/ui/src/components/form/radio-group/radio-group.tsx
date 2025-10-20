import { CircleIcon } from 'lucide-react';
import { Item, Indicator, Root } from '@radix-ui/react-radio-group';
import { RadioGroupProps, RadioItemProps } from './interface';
import { cn } from '../../../lib';

function RadioGroup({
  className,
  variant = 'vertical',
  ...props
}: RadioGroupProps) {
  return (
    <Root
      data-slot="radio-group"
      className={cn(
        'flex gap-3',
        {
          'flex-col': variant === 'vertical',
          'flex-row justify-end': variant === 'horizontal',
        },
        className
      )}
      {...props}
    />
  );
}

function RadioGroupItem({ className, ...props }: RadioItemProps) {
  return (
    <Item
      data-slot="radio-group-item"
      className={cn(
        'group aspect-square h-4 w-4 shrink-0 rounded-full border border-gray-500 text-teal-600 transition-[color,box-shadow] outline-none focus:border-zinc-700 disabled:border-gray-200 disabled:text-gray-200 aria-invalid:border-destructive aria-invalid:ring-destructive/20 [&_svg]:h-2 [&_svg]:w-2',
        className
      )}
      {...props}
    >
      <Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-teal-600 group-disabled:fill-gray-200" />
      </Indicator>
    </Item>
  );
}

export { RadioGroup, RadioGroupItem };
