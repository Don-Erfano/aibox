'use client';

import clsx from 'clsx';
import { CircleX, LoaderCircle, Search } from 'lucide-react';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import { AIBInput } from '../form';
import { IconRecord, IconState, SearchBarProps } from './interface';
import { useQueryState } from 'nuqs';
import { useDebouncedCallback } from '../../hooks';

export const SearchBar = ({ loading, searchPlaceholder }: SearchBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [searchKey, setSearchKey] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  });
  const [_, setPage] = useQueryState('page');

  const debouncedSearch = useDebouncedCallback(setSearchKey, 500);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const term = e.target.value.trim();
      debouncedSearch(term);
      setPage('1');
    },
    [debouncedSearch]
  );

  const handleClear = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.value = '';
      inputRef.current.focus();
    }
    setSearchKey('');
  }, [setSearchKey]);

  const iconsMap: IconRecord = {
    loading: {
      icon: <LoaderCircle className="animate-spin" strokeWidth={1.5} />,
    },
    search: {
      icon: <Search className="text-gray-200" strokeWidth={1.5} />,
    },
    clear: {
      icon: (
        <CircleX
          className="text-gray-500 hover:text-zinc-600"
          strokeWidth={1.5}
        />
      ),
    },
    searchHover: {
      icon: <Search className="text-gray-400" strokeWidth={1.5} />,
    },
    none: {
      icon: null,
    },
  };

  const getIconState = (): IconState => {
    const currentValue = inputRef.current?.value || '';
    const hasCurrentValue = currentValue.trim() !== '';

    if (currentValue && loading) return 'loading';
    if (!hasCurrentValue && !isFocused && !isHovered) return 'search';
    if (!hasCurrentValue && !isFocused && isHovered) return 'searchHover';
    if (!hasCurrentValue && isFocused) return 'none';
    if (hasCurrentValue && isFocused) return 'clear';
    if (hasCurrentValue && !isFocused && !isHovered) return 'none';
    return 'none';
  };

  const iconState = getIconState();
  const currentState = iconsMap[iconState];

  useEffect(() => {
    if (inputRef.current?.value) {
      inputRef.current?.focus();
    }
  }, []);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AIBInput
        ref={inputRef}
        className="h-10 truncate rounded-md outline-gray-400 placeholder:text-gray-400"
        variant="sm"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        defaultValue={searchKey}
        onChange={handleChange}
        placeholder={searchPlaceholder || 'جستجو کنید...'}
        endAdornment={
          <button
            className={clsx('mt-2 cursor-not-allowed', {
              'cursor-pointer': iconState === 'clear',
            })}
            onMouseDown={handleClear}
          >
            {currentState.icon}
          </button>
        }
      />
    </div>
  );
};
