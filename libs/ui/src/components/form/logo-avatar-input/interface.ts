import { ChangeEvent, MouseEventHandler } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';

export type UploadMode = 'preview' | 'upload';
export type Size = 'small' | 'large';

interface BaseProps {
  label?: string;
  required?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  mode?: UploadMode;
  size?: Size;
  src?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface UploadProps<TFieldValues extends FieldValues>
  extends BaseProps {
  mode: 'upload';
  control: Control<TFieldValues>;
  name: Path<TFieldValues>;
}

export interface PreviewProps extends BaseProps {
  mode?: 'preview';
  control?: never;
  name: never;
  src: string;
}

export type LogoAvatarProps<TFieldValues extends FieldValues = FieldValues> =
  | UploadProps<TFieldValues>
  | PreviewProps;
