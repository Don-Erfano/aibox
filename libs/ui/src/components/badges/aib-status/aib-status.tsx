import { FC } from 'react';
import clsx from 'clsx';
import { StatusBoxProps } from './interface';

const AibStatus: FC<StatusBoxProps> = ({
  label,
  bgColor,
  sizeClass = 'w-4 h-4',
  icon,
}) => {
  return (
    <div className="flex items-center gap-2 rtl:space-x-reverse">
      {icon ? (
        <span className={clsx(sizeClass, 'flex items-center justify-center')}>
          {icon}
        </span>
      ) : (
        <span className={clsx(sizeClass, 'rounded-full', bgColor)} />
      )}
      <span className="text-sm font-normal text-zinc-700">{label}</span>
    </div>
  );
};

export default AibStatus;
