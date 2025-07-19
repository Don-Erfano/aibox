import { NavigationButtonProps } from './interface';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '../../lib';

const NavigationButton = ({
  direction,
  onClick,
  disabled,
  ariaLabel,
}: NavigationButtonProps) => {
  const Icon = direction === 'next' ? ArrowLeft : ArrowRight;

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'p-2 bg-white rounded-full shadow-sm border border-teal-500',
        'transition-all duration-200',
        'hover:shadow-md hover:scale-105',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
        'md:absolute md:top-1/2 md:-translate-y-1/2 md:z-10',
        direction === 'prev' ? 'md:right-0' : 'md:left-0'
      )}
      aria-label={ariaLabel}
    >
      <Icon className="w-5 h-5 text-teal-600" />
    </button>
  );
};
export default NavigationButton;
