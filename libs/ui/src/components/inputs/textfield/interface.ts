import { DetailedHTMLProps, InputHTMLAttributes, ReactNode } from 'react';

interface ITextfieldProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    `children` | `ref` | `className` | `style` | `size` | `contentEditable`
  > {
  variant?: 'bulk' | 'dense';
  error?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  direction: 'rtl' | 'ltr';
}

export type { ITextfieldProps };
