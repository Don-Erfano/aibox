import { Badge } from '../badges';
import { TBadgeProps } from '../badges/badge/interface';
import { cn } from '../../lib';

const SelectChip = (props: TBadgeProps) => {
  return (
    <Badge
      {...props}
      variant="outline"
      className={cn(
        'cursor-pointer rounded-[4px] border-0 bg-zinc-50 px-2 py-1 text-sm leading-5 text-zinc-700 outline outline-gray-200 transition-colors',
        'hover:bg-gray-100 hover:outline-teal-700 active:bg-gray-200 active:!outline-slate-950 aria-disabled:cursor-default',
        'aria-disabled:bg-zinc-50 aria-disabled:text-gray-300 aria-disabled:outline-gray-200',
        'aria-selected:bg-gray-100 aria-selected:text-teal-700 aria-selected:outline-teal-700',
        props.className
      )}
    >
      {props.children}
    </Badge>
  );
};

export default SelectChip;
