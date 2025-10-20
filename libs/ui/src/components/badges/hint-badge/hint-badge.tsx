import { FC } from 'react';
import { HintBadgeProps } from './interface';
import clsx from 'clsx';

const HintBadge: FC<HintBadgeProps> = ({
  icon,
  title,
  title_color,
  bg_color,
}) => {
  return (
    <div
      className={clsx(
        'flex h-7 w-fit items-center justify-center gap-0.5 rounded-[2px] p-1 whitespace-nowrap',
        bg_color
      )}
    >
      <span
        className={clsx('text-xs font-medium whitespace-nowrap', title_color)}
      >
        {title}
      </span>
      <span className={clsx('h-4 w-4', title_color)}>{icon}</span>
    </div>
  );
};
export default HintBadge;
