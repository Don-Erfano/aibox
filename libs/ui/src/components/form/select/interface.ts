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
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
  error?: boolean;
  helperText?: string;
  readOnly?: boolean;
  size?: 'sm' | 'default';
  disabled?: boolean;
}
