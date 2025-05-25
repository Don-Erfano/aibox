import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

export interface IAutocompleteProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    | 'children'
    | 'ref'
    | 'className'
    | 'style'
    | 'size'
    | 'contentEditable'
    | 'onSelect'
    | 'value'
    | 'onChange'
  > {
  options: AutocompleteOption[];
  onSelect: (selectedOptions: AutocompleteOption[]) => void;
  tagAdornment?: ReactNode;
  label?: string;
  value?: string | string[];
  h_size: THeightSize;
  onChange?: (value: string) => void;
  variant: TVariant;
  mode: 'light' | 'dark';
  disabled?: boolean;
  enabled?: boolean;
  limited_tag?: number;
  isLoading?: boolean;
}

export interface AutocompleteOption {
  id: string | number;
  label: string;
  group?: string;
  startAdornment?: string;
}

export interface ISelectAutoRef {
  focus: () => void;
}
export type THeightSize = `sm` | `md` | `lg`;
export type TVariant = `single` | `multiple`;
