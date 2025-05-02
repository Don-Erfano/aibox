import {
  TooltipProvider,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '../ui/tooltip';

export const IconWithTooltip = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>{icon}</TooltipTrigger>
      <TooltipContent
        className="bg-black text-white border-0 rounded-sm"
        align="center"
      >
        <TooltipArrow className="-my-px w-[7px] h-[5.5px] fill-black drop-shadow-[0_1px_0_black]" />
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);
