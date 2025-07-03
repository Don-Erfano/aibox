import { FC } from 'react';
import type { loadingProps } from './interface';
import clsx from 'clsx';

const Loading: FC<loadingProps> = ({ size = 'md', theme = 'dark' }) => {
  const parentClasses = clsx('flex', {
    'gap-[3px]': size === 'sm',
    'gap-1': size === 'md',
    'gap-1.5': size === 'lg',
  });
  const commonClasses = clsx(
    'rounded-[1px] animate-loading-animation duration-150 w-1.5',
    {
      'h-4': size === 'sm',
      'h-5': size === 'md',
      'w-2.5 h-[30px]': size === 'lg',
    }
  );

  const firstChildClasses = clsx(commonClasses, 'delay-[500ms]', {
    'bg-teal-600': theme === 'dark',
    'bg-zinc-50': theme === 'light',
  });

  const secondChildClasses = clsx(commonClasses, 'delay-[350ms]', {
    'bg-teal-600/50': theme === 'dark',
    'bg-gray-200': theme === 'light',
  });

  const thirdChildClasses = clsx(commonClasses, 'delay-200', {
    'bg-teal-600/25': theme === 'dark',
    'bg-gray-300': theme === 'light',
  });

  return (
    <div className={parentClasses}>
      <div className={firstChildClasses} />
      <div className={secondChildClasses} />
      <div className={thirdChildClasses} />
    </div>
  );
};

export default Loading;
