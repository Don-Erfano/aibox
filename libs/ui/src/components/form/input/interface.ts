import { ReactNode } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

interface AIBInputProps extends React.ComponentProps<'input'> {
  variant?: 'sm' | 'md' | 'lg';
  label?: string;
  direction?: 'rtl' | 'ltr';
  endAdornment?: ReactNode;
  startAdornment?: ReactNode;
}

interface RhfInputProps<TFieldValues extends FieldValues>
  extends Omit<AIBInputProps, 'name'> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  description?: string;
  label?: string;
}

export type { AIBInputProps, RhfInputProps };
