import { ReactNode } from 'react';

export interface CustomSwiperProps {
  slides: ReactNode[];
  navigation?: boolean;
  pagination?: boolean;
  autoplay?: boolean | { delay?: number; disableOnInteraction?: boolean };
  spaceBetween?: number;
  className?: string;
  onSlideChange?: (index: number) => void;
}

export interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  disabled: boolean;
  ariaLabel: string;
}
