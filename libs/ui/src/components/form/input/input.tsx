'use client';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { cn } from '../../../lib';

import type { AIBInputProps } from './interface';

export const AIBInput = ({
  className,
  type,
  endAdornment,
  startAdornment,
  variant = 'md',
  ...props
}: AIBInputProps) => {
  const [inputType, setInputType] = useState(type);

  const handleChangeType = () => {
    setInputType((prev) => (prev === 'password' ? 'text' : 'password'));
  };

  return (
    <div
      className="relative aria-readonly:text-gray-500"
      aria-readonly={props['aria-readonly']}
    >
      {startAdornment && (
        <div className="absolute -right-1 top-1/2 left-auto -translate-1/2">
          {startAdornment}
        </div>
      )}
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          'file:text-foreground placeholder:text-gray-500 aria-invalid:placeholder:text-red-600 selection:bg-teal-600  outline outline-gray-500',
          'selection:text-white flex w-full min-w-0 rounded',
          'bg-transparent px-2 text-base transition-[color,box-shadow] border-none file:inline-flex',
          'file:h-7 file:outline-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none',
          'disabled:cursor-default disabled:opacity-50 md:text-sm aria-readonly:text-gray-500',
          'hover:outline-zinc-600 focus-visible:outline-slate-800 aria-invalid:not-focus-visible:text-red-600',
          'aria-invalid:outline-red-600 aria-readonly:outline-dashed aria-readonly:pointer-events-none aria-readonly:outline-gray-500',
          {
            'pr-10': !!startAdornment,
            'pl-9': !!endAdornment || type === 'password',
            'py-[10px]': variant === 'sm',
            'py-[14px]': variant === 'md',
            'py-[18px]': variant === 'lg',
          },

          className
        )}
        {...props}
      />
      {type === 'password' ? (
        <div
          className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2"
          onClick={handleChangeType}
        >
          {inputType === 'password' ? (
            <Eye className="text-zinc-600" />
          ) : (
            <EyeOff className="text-zinc-600" />
          )}
        </div>
      ) : (
        <div className="absolute left-2 top-1/2 -translate-y-1/2">
          {endAdornment}
        </div>
      )}
    </div>
  );
};
