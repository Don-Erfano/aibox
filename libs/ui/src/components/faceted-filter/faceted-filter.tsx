'use client';

import { FC, useCallback, useMemo, useState } from 'react';
import { Check, PlusCircle, XCircle } from 'lucide-react';
import { FacetedFilterProps, OptionFilter } from './interface';

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../command';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';
import { Button } from '../form';
import { Separator } from '../separator';
import { Badge } from '../badges';
import { cn } from '../../lib';

const FacetedFilter: FC<FacetedFilterProps> = ({
  title,
  options,
  value = [],
  onChange,
  multiple = false,
}) => {
  const [open, setOpen] = useState(false);

  const selectedValues = useMemo(() => new Set(value), [value]);

  const onItemSelect = useCallback(
    (option: OptionFilter, isSelected: boolean) => {
      let newValues: string[] = [];

      if (multiple) {
        const updated = new Set(selectedValues);
        if (isSelected) {
          updated.delete(option.value);
        } else {
          updated.add(option.value);
        }
        newValues = Array.from(updated);
      } else {
        newValues = isSelected ? [] : [option.value];
        setOpen(false);
      }

      onChange?.(newValues);
    },
    [multiple, onChange, selectedValues]
  );

  const onReset = useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      onChange?.([]);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="subtle" size="sm" className="h-10">
          {selectedValues.size > 0 ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}
          {title}
          {selectedValues.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge
                variant="filter"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>
              <div className="hidden items-center gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge variant="filter" className="font-normal">
                    {selectedValues.size} مورد
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge variant="filter" key={option.value}>
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[12.5rem] p-0" align="end">
        <Command>
          <CommandInput placeholder="جستجو کنید..." />
          <CommandList className="max-h-full w-full">
            <CommandEmpty>موردی یافت نشد</CommandEmpty>
            <CommandGroup className="max-h-[25rem] overflow-x-hidden overflow-y-auto">
              {options.map((option) => {
                const isSelected = selectedValues.has(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => onItemSelect(option, isSelected)}
                    className="h-9 w-full"
                  >
                    <div className="flex w-full flex-row-reverse items-center justify-between gap-2">
                      <div
                        className={cn(
                          'flex size-4 items-center rounded-xs border border-primary',
                          isSelected
                            ? 'bg-primary'
                            : 'opacity-50 [&_svg]:invisible'
                        )}
                      >
                        <Check className="rounded-xs bg-teal-600 text-white" />
                      </div>
                      {option.icon && <option.icon />}
                      <span
                        className={cn(
                          'truncate',
                          isSelected ? 'text-teal-600' : ''
                        )}
                      >
                        {option.label}
                      </span>
                    </div>
                    {option.count && (
                      <span className="ml-auto font-mono text-xs">
                        {option.count}
                      </span>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center text-center"
                  >
                    لغو فیلتر
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default FacetedFilter;
