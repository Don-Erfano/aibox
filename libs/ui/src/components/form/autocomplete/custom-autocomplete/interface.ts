import { Control, FieldValues, Path } from 'react-hook-form';
import { THeightSize, TVariant } from '../interface';
import { ReactNode } from 'react';

export interface RHFAutocompleteProps<
  TField extends FieldValues,
  TOption = { value: string; label: string }
> {
  control: Control<TField>;
  name: Path<TField>;
  label?: string;
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
  options: TOption[];
  getOptionValue?: (opt: TOption) => string;
  getOptionLabel?: (opt: TOption) => string;
}
