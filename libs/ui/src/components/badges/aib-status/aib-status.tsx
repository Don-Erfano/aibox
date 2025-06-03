import { FC } from 'react';
import clsx from 'clsx';
import { StatusBoxProps } from './interface';

const AibStatus: FC<StatusBoxProps> = ({
  label,
  bgColor,
  sizeClass = 'w-4 h-4',
}) => {
  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className={clsx(sizeClass, 'rounded-full', bgColor)} />
      <span className={clsx('text-sm font-normal text-zinc-700')}>{label}</span>
    </div>
  );
};

export default AibStatus;
