'use client';

import clsx from 'clsx';
import { CircleX, LoaderCircle, Search } from 'lucide-react';
import { useState } from 'react';

import { AIBInput } from '../form/input/input';
import { IconRecord, IconState, SearchBarProps } from './interface';

export const SearchBar = ({
  value,
  onValueChange,
  loading,
  placeholder = 'جستجو کنید...',
}: SearchBarProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const hasValue = value.trim() !== '';

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
      onClick: () => onValueChange(''),
    },
    searchHover: {
      icon: <Search className="text-gray-400" strokeWidth={1.5} />,
    },
    none: {
      icon: null,
    },
  };

  const getIconState = (): IconState => {
    if (value && loading) return 'loading';
    if (!hasValue && !isFocused && !isHovered) return 'search';
    if (!hasValue && !isFocused && isHovered) return 'searchHover';
    if (!hasValue && isFocused) return 'none';
    if (hasValue && isFocused) return 'clear';
    if (hasValue && !isFocused && !isHovered) return 'none';
    return 'none';
  };

  const iconState = getIconState();
  const currentState = iconsMap[iconState];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AIBInput
        className="rounded-md h-10 outline-gray-400 placeholder:text-gray-400"
        variant="sm"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        endAdornment={
          <button
            className={clsx('mt-2 cursor-not-allowed', {
              'cursor-pointer': iconState === 'clear',
            })}
            onMouseDown={() => onValueChange('')}
          >
            {currentState.icon}
          </button>
        }
      />
    </div>
  );
};
