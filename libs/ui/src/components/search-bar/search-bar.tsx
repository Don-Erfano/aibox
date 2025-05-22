'use client';

import clsx from 'clsx';
import {
  ChevronLeft as ChevronLeftIcon,
  CircleX as ClearIcon,
  Search as SearchIcon,
} from 'lucide-react';

import { Button } from '../form';
import { SearchBarProps } from './interface';
import { AIBInput } from '../form/input/input';

export const SearchBar = (props: SearchBarProps) => {
  const {
    open,
    toggleOpen,
    value,
    onValueChange,
    placeholder = 'جستجو کنید...',
  } = props;
  const hasValue = value.trim() !== '';

  return (
    <div className="flex h-10 w-full items-center justify-end text-h2-xl">
      {open ? (
        <div className="flex h-10 w-full items-center justify-between gap-[10px]">
          <AIBInput
            placeholder={placeholder}
            endAdornment={
              <Button
                className={clsx(
                  'size-5 !ring-0 border-none !bg-transparent p-0 transition-colors duration-300 disabled:cursor-not-allowed',
                  {
                    '!text-neutral-800 hover:!text-zinc-700': hasValue,
                    'text-gray-300': !hasValue,
                  }
                )}
                disabled={!hasValue}
                onClick={() => onValueChange('')}
              >
                {hasValue ? <ClearIcon /> : <SearchIcon />}
              </Button>
            }
            value={value}
            onChange={(e) => onValueChange(e.target.value)}
          />

          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-700"
            onClick={() => toggleOpen(false)}
          >
            <ChevronLeftIcon />
          </Button>
        </div>
      ) : (
        <Button
          size="icon"
          variant="ghost"
          className="text-zinc-700"
          onClick={() => toggleOpen(true)}
        >
          <SearchIcon />
        </Button>
      )}
    </div>
  );
};
