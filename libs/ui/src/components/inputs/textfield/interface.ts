import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  RegisterOptions,
} from 'react-hook-form';

interface IBaseTextfieldProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    `children` | `ref` | `className` | `style` | `size` | `contentEditable`
  > {
  variant?: 'bulk' | 'dense';
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  direction?: 'rtl' | 'ltr';
}

interface IRhfTextfieldProps<TField extends FieldValues>
  extends IBaseTextfieldProps {
  control?: any;
  name: Path<TField>;
  rules?: RegisterOptions<TField>;
  defaultValue?: PathValue<TField, Path<TField>>;
}

export type { IBaseTextfieldProps, IRhfTextfieldProps };
