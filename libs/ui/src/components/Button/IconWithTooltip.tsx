import {
  TooltipProvider,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from './Tooltip';
import { IconWithTooltipProps } from './types';

export const IconWithTooltip = ({ icon, title }: IconWithTooltipProps) => (
  <TooltipProvider>
    <Tooltip delayDuration={300}>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipContent
        className="bg-zinc-800 text-stone-50 border-0 rounded-sm"
        align="center"
        sideOffset={12}
      >
        <TooltipArrow className="-my-px w-[7px] h-[5.5px] fill-zinc-800" />
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
