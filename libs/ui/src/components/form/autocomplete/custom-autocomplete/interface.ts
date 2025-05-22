import { Control, FieldValues, Path } from 'react-hook-form';
import { THeightSize, TVariant } from '../interface';
import { ReactNode } from 'react';

interface AIBAutocompleteProps {
  options: { label: string; value: string }[];
}

interface RHFAutocompleteProps<TField extends FieldValues>
  extends Omit<AIBAutocompleteProps, 'name'> {
  control: Control<TField>;
  name: Path<TField>;
  label: string;
  placeholder: string;
  description?: string;
  mode?: 'light' | 'dark';
  variant?: TVariant;
  h_size?: THeightSize;
  hint_txt?: string;
  limited_tag?: number;
  disabled?: boolean;
  readOnly?: boolean;
  isLoading?: boolean;
  tagAdornment?: ReactNode;
}

export type { AIBAutocompleteProps, RHFAutocompleteProps };
