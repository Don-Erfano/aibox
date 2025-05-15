'use client';

import clsx from 'clsx';
import {
  ChevronLeft as ChevronLeftIcon,
  CircleX as ClearIcon,
  Search as SearchIcon,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

import { useDebounce } from '../../hooks';
import { Button } from '../button';
import { BaseTextField } from '../inputs/textfield/baseTextField';
import { SearchBarProps } from './interface';

export const SearchBar = (props: SearchBarProps) => {
  const { open, toggleOpen, placeholder = 'جستجو کنید...' } = props;

  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
    shallow: false,
  });

  const [inputValue, setInputValue] = useState(search ?? '');
  const debouncedInput = useDebounce(inputValue, 500);

  useEffect(() => {
    setSearch(debouncedInput.trim());
  }, [debouncedInput, setSearch]);

  useEffect(() => {
    setInputValue(search ?? '');
  }, [search]);

  const hasValue = inputValue.trim() !== '';

  return (
    <div className="flex h-10 w-full items-center justify-end text-h2-xl">
      {open ? (
        <div className="flex h-10 w-full items-center justify-between gap-[10px]">
          <BaseTextField
            variant="sm"
            placeholder={placeholder}
            endAdornment={
              <Button
                className={clsx(
                  'size-6 !ring-0 border-none !bg-transparent p-0 transition-colors duration-300 disabled:cursor-not-allowed',
                  {
                    '!text-neutral-800 hover:!text-zinc-700': hasValue,
                    'text-gray-300': !hasValue,
                  }
                )}
                disabled={!hasValue}
                onClick={() => setInputValue('')}
              >
                {hasValue ? <ClearIcon /> : <SearchIcon />}
              </Button>
            }
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
