import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

type IIconButton = Omit<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  'className' | 'style'
>;

export type { IIconButton };
