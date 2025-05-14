import { CircleX as CloseIcon } from 'lucide-react';

import { Badge } from '../../badge';
import { ToolbarChipProps } from '../types';
import { Button } from '../../button';

export const ToolbarChip = ({ number, onIconClick }: ToolbarChipProps) => {
  return (
    <Badge className="bg-teal-600 rounded-[20px] pl-1 pr-3 py-px w-16 h-7 flex justify-center items-center gap-2 text-white">
      <span className="text-sm font-normal mt-1">{number}</span>
      <Button
        variant="default"
        className="!size-6 [&_svg]:!size-5 cursor-pointer hover:bg-teal-600 hover:!text-white"
        onClick={onIconClick}
      >
        <CloseIcon />
      </Button>
    </Badge>
  );
};
