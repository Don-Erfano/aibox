import { Root } from '@radix-ui/react-radio-group';
import { cn } from '../../../lib';

export const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof Root>) => {
  return (
    <Root
      data-slot="radio-group"
      className={cn('grid gap-4', className)}
      {...props}
    />
  );
};
