'use client';

import * as React from 'react';
import { Check, PlusCircle, XCircle } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Button } from '../../form';
import { Separator } from '../../separator';
import { Badge } from '../../badges';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../../command';
import { DataTableFacetedFilterProps, Option } from '../types';
import { cn } from '../../../lib';

export function TableFacetedFilter<TData, TValue>({
  column,
  title,
  options,
  multiple,
}: DataTableFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = React.useMemo(() => {
    return new Set(Array.isArray(columnFilterValue) ? columnFilterValue : []);
  }, [columnFilterValue]);

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      if (!column) return;

      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
      setOpen(false);
    },
    [column]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="subtle" size="sm" className="h-10">
          {selectedValues?.size > 0 ? (
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
          {selectedValues?.size > 0 && (
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
}
