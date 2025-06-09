import { InputHTMLAttributes } from 'react';

export interface AibImageUploaderProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'type'> {
  error?: boolean;
  errorMessage?: string;
  initialImageUrl?: string | string[];
  onFileChange?: (files: File | File[] | null) => void;
}
