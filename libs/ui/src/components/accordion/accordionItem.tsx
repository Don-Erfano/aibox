import { ComponentProps, FC } from 'react';
import { Item } from '@radix-ui/react-accordion';
import { cn } from '../../lib';

const AccordionItem: FC<ComponentProps<typeof Item>> = ({
  className,
  ...props
}) => (
  <Item
    data-slot="accordion-item"
    className={cn('border-b last:border-b-0', className)}
    {...props}
  />
);

export default AccordionItem;
