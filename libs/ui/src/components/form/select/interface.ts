import { Control, FieldValues, Path } from 'react-hook-form';
import * as SelectPrimitive from '@radix-ui/react-select';

type AIBSelectProps = React.ComponentProps<typeof SelectPrimitive.Root>;

interface RhfSelectProps<TFieldValues extends FieldValues>
  extends Omit<AIBSelectProps, 'name'> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  label?: string;
}

export type { AIBSelectProps, RhfSelectProps };
