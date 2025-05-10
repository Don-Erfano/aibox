import { viewModeButtons } from '../constants';
import { ViewModeButtonsProps } from '../types';
import FilterIconButton from './FilterIconButton';

export const ViewModeButtons = ({
  activeMode,
  onButtonClick,
}: ViewModeButtonsProps) => {
  return (
    <div className="flex gap-5">
      {viewModeButtons.map((button) => (
        <FilterIconButton
          key={button.name}
          icon={button.icon}
          isActive={button.name === activeMode}
          onClick={() => onButtonClick(button.name)}
          hasChip={false}
        />
      ))}
    </div>
  );
};
