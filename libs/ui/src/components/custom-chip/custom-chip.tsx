import { CircleX as CloseIcon } from 'lucide-react';

import { ToolbarChipProps } from './interface';
import { Badge } from '../badge';

export const CustomChip = ({ label, onIconClick }: ToolbarChipProps) => {
  return (
    <Badge className="bg-teal-600 rounded-[20px] pl-1 pr-3 py-px min-w-16  min-h-7 flex justify-center items-center gap-3 text-white">
      <span className="text-sm font-normal mt-1">{label}</span>
      <button
        className="!size-6 [&_svg]:!size-5 cursor-pointer bg-teal-600 text-white !border-teal-600"
        onClick={onIconClick}
      >
        <CloseIcon />
      </button>
    </Badge>
  );
};
