import { ChangeEvent, MouseEventHandler } from 'react';

export type UploadMode = 'preview' | 'upload';

// Base props without customStyles
interface BaseProps {
  label?: string;
  required?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
  mode?: UploadMode;
}

interface UploadProps extends BaseProps {
  mode: 'upload';
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  src?: string;
}

interface PreviewProps extends BaseProps {
  mode?: 'preview';
  src: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export type LogoAvatarProps = UploadProps | PreviewProps;
