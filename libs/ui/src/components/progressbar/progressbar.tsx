import clsx from 'clsx';
import { useEffect } from 'react';
import { IProgressbarProps } from './interface';

const Progressbar = (props: IProgressbarProps) => {
  const {
    max = 1,
    min = 0,
    value = 0,
    variant = 'incremental',
    suffix = '',
    size = 'thin',
  } = props;

  const decrementalBgColors = {
    'bg-teal-700': (value * 100) / max > 25,
    'bg-orange-600': (value * 100) / max > 15 && (value * 100) / max <= 25,
    'bg-red-600': (value * 100) / max >= 0 && (value * 100) / max <= 15,
  };
  const incrementalBgColors = {
    'bg-red-600': (value * 100) / max > 85,
    'bg-orange-600': (value * 100) / max > 75 && (value * 100) / max <= 85,
    'bg-teal-700': (value * 100) / max >= 0 && (value * 100) / max <= 75,
  };

  const sizeClassName = {
    'h-2.5': size === 'thick',
    'h-1.5': size === 'thin',
  };

  useEffect(() => {
    if (min > max) {
      throw new Error('max should equal or bigger than min');
    }
  }, [min, max]);

  return (
    <div
      className={clsx('relative w-full rounded-md bg-gray-200', sizeClassName)}
      dir="ltr"
    >
      <div
        className={clsx(
          'absolute w-3 rounded-md',
          {
            ...(variant === 'incremental'
              ? incrementalBgColors
              : decrementalBgColors),
          },
          sizeClassName
        )}
        style={{
          width: `${(value * 100) / max}%`,
          minWidth: '0%',
          maxWidth: '100%',
        }}
      />
      <span className="absolute top-4 left-0 text-xs text-gray-500">
        {`${min} ${suffix}`}
      </span>
      <span className="absolute top-4 right-0 text-xs text-gray-500">{`${max} ${suffix}`}</span>
    </div>
  );
};

export default Progressbar;
