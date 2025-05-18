import { Indicator, Item } from '@radix-ui/react-radio-group';
import { CircleIcon } from 'lucide-react';
import { cn } from '../../../lib';

export const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof Item>) => {
  return (
    <Item
      data-slot="radio-group-item"
      className={cn(
        'border-gray-500 text-teal-600 focus:border-zinc-700 aria-invalid:ring-destructive/20  aria-invalid:border-destructive aspect-square shrink-0 rounded-full border transition-[color,box-shadow] outline-none group disabled:border-gray-200 disabled:text-gray-200 h-4 w-4 [&_svg]:h-2 [&_svg]:w-2 ',
        className
      )}
      {...props}
    >
      <Indicator
        data-slot="radio-group-indicator"
        className="relative flex items-center justify-center"
      >
        <CircleIcon className="fill-teal-600 group-disabled:fill-gray-200 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 " />
      </Indicator>
    </Item>
  );
};
