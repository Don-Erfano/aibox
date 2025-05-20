import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { Control, FieldValues, Path } from 'react-hook-form';

interface AIBCheckboxProps
  extends React.ComponentProps<typeof CheckboxPrimitive.Root> {
  readOnly?: boolean;
}

interface RHFCheckboxProps<TFieldValues extends FieldValues>
  extends Omit<AIBCheckboxProps, 'name'> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  label: string;
}

export type { AIBCheckboxProps, RHFCheckboxProps };
