import { FC } from 'react';
import clsx from 'clsx';
import { StatusBoxProps } from './interface';

const AibStatus: FC<StatusBoxProps> = ({
  label,
  bgColor,
  textColor,
  sizeClass = 'w-4 h-4',
}) => {
  const textClass = textColor ?? bgColor.replace(/^bg-/, 'text-');

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className={clsx(sizeClass, 'rounded-full', bgColor)} />
      <span className={clsx(textClass, 'text-sm font-normal')}>{label}</span>
    </div>
  );
};

export default AibStatus;
