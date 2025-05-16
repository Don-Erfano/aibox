import { CircleX as CloseIcon } from 'lucide-react';

import { ToolbarChipProps } from './interface';
import { Badge } from '../badge';

export const CustomChip = ({ label, onIconClick }: ToolbarChipProps) => {
  return (
    <Badge className="border-none bg-teal-600 h-7 rounded-[20px] gap-2 py-px flex justify-between items-center text-white">
      <span className="text-sm font-normal mt-1">{label}</span>
      <button
        className="!size-5 [&_svg]:!size-5 cursor-pointer bg-teal-600 text-white !border-teal-600"
        onClick={onIconClick}
      >
        <CloseIcon />
      </button>
    </Badge>
  );
};
