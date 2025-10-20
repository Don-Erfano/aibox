'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import type { AIBInputProps } from './interface';
import { cn } from '../../../lib';

export const AIBInput = ({
  className,
  type,
  endAdornment,
  startAdornment,
  variant = 'sm',
  readOnly,
  ...props
}: AIBInputProps) => {
  const [inputType, setInputType] = useState(type);

  const handleChangeType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div
      className={'relative w-full aria-readonly:text-gray-500'}
      aria-readonly={props['aria-readonly']}
    >
      {startAdornment && (
        <div
          className={cn(
            'absolute top-1/2 -right-1 left-auto -translate-1/2 text-zinc-600',
            {
              'text-red-600': props['aria-invalid'],
              'text-gray-40': props.disabled,
            }
          )}
        >
          {startAdornment}
        </div>
      )}
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'outline outline-gray-500 selection:bg-teal-600 file:text-foreground placeholder:text-gray-400 aria-invalid:placeholder:text-red-600',
          'flex w-full min-w-0 rounded leading-5 selection:text-white placeholder:text-xs',
          'border-none bg-transparent px-2 text-sm transition-[color,box-shadow] file:inline-flex',
          'text-zinc-600 file:h-7 file:bg-transparent file:font-medium file:outline-0 disabled:pointer-events-none',
          'disabled:cursor-default disabled:text-gray-400 disabled:outline-gray-400 aria-readonly:text-gray-500',
          'hover:outline-zinc-600 focus-visible:text-zinc-700 focus-visible:outline-slate-800 aria-invalid:not-focus-visible:text-red-600',
          'aria-invalid:outline-red-600 aria-readonly:pointer-events-none aria-readonly:outline-gray-500 aria-readonly:outline-dashed',
          {
            'pr-10': !!startAdornment,
            'pl-13': !!endAdornment || type === 'password',
            'py-2.5': variant === 'sm',
            'py-[14px]': variant === 'md',
            'py-[18px]': variant === 'lg',
            'pointer-events-none !text-gray-500 outline-gray-500 outline-dashed':
              readOnly,
          },
          className
        )}
        {...props}
      />
      {type === 'password' ? (
        <div
          className={cn(
            'absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer text-zinc-600',
            {
              '!text-red-600': props['aria-invalid'],
              'text-gray-400': props.disabled,
            }
          )}
          onClick={handleChangeType}
        >
          {inputType === 'password' ? <Eye /> : <EyeOff />}
        </div>
      ) : (
        <div
          className={cn(
            'absolute top-1/2 left-2 -translate-y-1/2 text-zinc-600',
            {
              'text-red-600': props['aria-invalid'],
              'text-gray-400': props.disabled,
            }
          )}
        >
          {endAdornment}
        </div>
      )}
    </div>
  );
};
