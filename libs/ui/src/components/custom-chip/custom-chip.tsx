import { FC } from "react";
import { CircleX as CloseIcon } from "lucide-react";

import { ToolbarChipProps } from "./interface";
import { Badge } from "../badges/badge";

export const CustomChip: FC<ToolbarChipProps> = ({ label, onIconClick }) => {
  return (
    <Badge className="flex h-7 items-center justify-between gap-2 rounded-[20px] border-none bg-teal-600 py-px text-white">
      <span className="mt-1 text-sm font-normal">{label}</span>
      <button
        className="!size-5 cursor-pointer !border-teal-600 bg-teal-600 text-white [&_svg]:!size-5"
        onClick={onIconClick}
      >
        <CloseIcon />
      </button>
    </Badge>
  );
};
