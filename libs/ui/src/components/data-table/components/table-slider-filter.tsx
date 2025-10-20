'use client';

import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import { PlusCircle, XCircle } from 'lucide-react';
import { Separator } from '../../separator';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { Label } from '../../label';
import { AIBInput, Button } from '../../form';
import { Badge } from '../../badges';
import { cn } from '../../../lib';
import { Slider } from '../../slider';

interface Range {
  min: number;
  max: number;
}

type RangeValue = [number, number];

function getIsValidRange(value: unknown): value is RangeValue {
  return (
    Array.isArray(value) &&
    value.length === 2 &&
    typeof value[0] === 'number' &&
    typeof value[1] === 'number'
  );
}

interface DataTableSliderFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
}

export function TableSliderFilter<TData>({
  column,
  title,
}: DataTableSliderFilterProps<TData>) {
  const id = React.useId();
  const [open, setOpen] = React.useState(false);

  const columnFilterValue = getIsValidRange(column.getFilterValue())
    ? (column.getFilterValue() as RangeValue)
    : undefined;

  const defaultRange = column.columnDef.meta?.range;
  const unit = column.columnDef.meta?.unit;
  const showSlider = column?.columnDef?.meta?.showSlider;

  const { min, max, step } = React.useMemo<Range & { step: number }>(() => {
    let minValue = 0;
    let maxValue = 1000000000000000;

    if (defaultRange && getIsValidRange(defaultRange)) {
      [minValue, maxValue] = defaultRange;
    } else {
      const values = column.getFacetedMinMaxValues();
      if (values && Array.isArray(values) && values.length === 2) {
        const [facetMinValue, facetMaxValue] = values;
        if (
          typeof facetMinValue === 'number' &&
          typeof facetMaxValue === 'number'
        ) {
          minValue = facetMinValue;
          maxValue = facetMaxValue;
        }
      }
    }

    const rangeSize = maxValue - minValue;
    const step =
      rangeSize <= 20
        ? 1
        : rangeSize <= 100
        ? Math.ceil(rangeSize / 20)
        : Math.ceil(rangeSize / 50);

    return { min: minValue, max: maxValue, step };
  }, [column, defaultRange]);

  const range = React.useMemo((): RangeValue => {
    return columnFilterValue ?? [min, max];
  }, [columnFilterValue, min, max]);

  const formatValue = React.useCallback((value: number) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, []);

  const onFromInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const numValue = Number(inputValue);
      if (!Number.isNaN(numValue) && inputValue.trim() !== '') {
        if (showSlider && defaultRange) {
          if (numValue < min || numValue > range[1]) return;
        }
        column.setFilterValue([numValue, range[1]]);
      }
    },
    [column, min, range, showSlider, defaultRange]
  );

  const onToInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = event.target.value;

      const numValue = Number(inputValue);
      if (!Number.isNaN(numValue) && inputValue.trim() !== '') {
        if (showSlider && defaultRange) {
          if (numValue > max || numValue < range[0]) return;
        }
        column.setFilterValue([range[0], numValue]);
      }
    },
    [column, max, range, showSlider, defaultRange]
  );

  const onSliderValueChange = React.useCallback(
    (value: RangeValue) => {
      if (Array.isArray(value) && value.length === 2) {
        column.setFilterValue(value);
      }
    },
    [column]
  );

  const onReset = React.useCallback(
    (event: React.MouseEvent) => {
      if (event.target instanceof HTMLDivElement) {
        event.stopPropagation();
      }
      column.setFilterValue(undefined);
    },
    [column]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="subtle" size="sm" className="h-10">
          {columnFilterValue ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
              onClick={onReset}
            >
              <XCircle />
            </div>
          ) : (
            <PlusCircle />
          )}
          <span>{title}</span>
          {columnFilterValue ? (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge variant="filter">
                {formatValue(columnFilterValue[0])} -{' '}
                {formatValue(columnFilterValue[1])}
                {unit ? ` ${unit}` : ''}
              </Badge>
            </>
          ) : null}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-auto flex-col gap-4">
        <div className="flex w-[180px] flex-col gap-5">
          <div className="flex w-full flex-col items-center gap-4">
            <div className="flex w-full items-center gap-4">
              <Label htmlFor={`${id}-from`}>از</Label>
              <div className="relative w-full">
                <AIBInput
                  id={`${id}-from`}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="من"
                  min={defaultRange ? min : undefined}
                  max={defaultRange ? max : undefined}
                  aria-valuemin={defaultRange ? min : undefined}
                  aria-valuemax={defaultRange ? max : undefined}
                  value={range[0].toString()}
                  onChange={onFromInputChange}
                  className={cn('h-8 w-full', unit && 'pl-8')}
                />
                {unit && (
                  <span className="absolute top-0 bottom-0 left-0 flex items-center rounded-l-md bg-accent px-2 text-sm text-muted-foreground">
                    {unit}
                  </span>
                )}
              </div>
            </div>
            <div className="flex w-full items-center gap-4">
              <Label htmlFor={`${id}-to`}>تا</Label>
              <div className="relative w-full">
                <AIBInput
                  id={`${id}-to`}
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  placeholder="تا"
                  min={min}
                  max={max}
                  aria-valuemin={min}
                  aria-valuemax={max}
                  value={range[1]?.toString()}
                  onChange={onToInputChange}
                  className={cn('h-8 w-full', unit && 'pl-8')}
                />
                {unit && (
                  <span className="absolute top-0 bottom-0 left-0 flex items-center rounded-l-md bg-accent px-2 text-sm text-muted-foreground">
                    {unit}
                  </span>
                )}
              </div>
            </div>
          </div>

          {showSlider && (
            <Slider
              id={`${id}-slider`}
              min={min}
              max={max}
              step={step}
              value={range}
              onValueChange={onSliderValueChange}
            />
          )}
        </div>
        <Separator />
        <div
          aria-label={`Clear ${title} filter`}
          onClick={onReset}
          className="cursor-pointer text-center text-sm text-zinc-600"
        >
          لغو فیلتر
        </div>
      </PopoverContent>
    </Popover>
  );
}
