'use client';

import clsx from 'clsx';
import {
  ChevronLeft as ChevronLeftIcon,
  CircleX as ClearIcon,
  Search as SearchIcon,
} from 'lucide-react';

import { Button } from '../button';
import { SearchBarProps } from './interface';

export const SearchBar = (props: SearchBarProps) => {
  const {
    value,
    onValueChange,
    open,
    toggleOpen,
    placeholder = 'جستجو کنید...',
  } = props;
  const hasValue = value?.trim() !== '';

  return (
    <div
      dir="rtl"
      className="flex h-10 w-full items-center justify-end text-h2-xl"
    >
      {open ? (
        <div className="flex h-10 w-full items-center justify-between gap-[10px]">
          <div className="relative w-full">
            <input
              className="flex outline-0 h-10 w-full pr-2 pl-8 rounded-[10px] !text-neutral-600 bg-white border border-teal-600 text-sm caret-teal-600 transition-colors duration-300 ease-in-out placeholder:text-neutral-500 hover:bg-neutral-100 hover:border-neutral-600 focus-visible:ring-0 focus:bg-white focus:!border-teal-600"
              placeholder={placeholder}
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
            />

            <Button
              className={clsx(
                'size-6 !bg-white !ring-0 [&_svg]:size-5 absolute border-0 left-2 top-2 z-10 items-center justify-center p-0 disabled:cursor-not-allowed',
                {
                  'text-neutral-800 hover:text-zinc-700': hasValue,
                  'text-gray-300': !hasValue,
                }
              )}
              disabled={!hasValue}
              onClick={() => hasValue && onValueChange('')}
            >
              {hasValue ? <ClearIcon /> : <SearchIcon />}
            </Button>
          </div>

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
