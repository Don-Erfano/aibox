import { CircleX as CloseIcon } from 'lucide-react';

import { Button } from '../../button';
import { FilterIconButtonProps } from '../types';

const FilterIconButton = (props: FilterIconButtonProps) => {
  const { icon, isActive, onClick, disabled } = props;

  const onChipButtonClick = () => {
    if (props.hasChip) props.onChipClick();
  };

  return (
    <div className="flex items-center flex-row-reverse gap-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={onClick}
        isFilled
        aria-selected={isActive}
        disabled={disabled}
      >
        {icon}
      </Button>
      {props.hasChip && !!props.chipLabel && (
        <Button
          className="h-7 px-2 hover:bg-teal-600 border-0 text-stone-50 hover:text-stone-50 hover:shadow-none"
          variant="ghost"
          isFilled
        >
          {props.chipLabel}
          <span
            onClick={(e) => {
              e.stopPropagation();
              onChipButtonClick();
            }}
          >
            <CloseIcon className="size-5" />
          </span>
        </Button>
      )}
    </div>
  );
};

export default FilterIconButton;
