// types/logoAvatar.ts
import { ChangeEventHandler, CSSProperties, MouseEventHandler } from 'react';

export interface ILogoAvatar {
  label?: string;
  src?: string;
  noImageSrc?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onClick?: MouseEventHandler<HTMLDivElement>;
  required?: boolean;
  customStyles?: {
    height?: CSSProperties['height'];
    width?: CSSProperties['width'];
  };
  isUploadButton?: boolean;
}
