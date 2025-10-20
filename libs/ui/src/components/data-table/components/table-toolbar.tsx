'use client';

import React, { useCallback, useState } from 'react';
import type { Column } from '@tanstack/react-table';
import { FilterIcon, FilterX } from 'lucide-react';
import { AIBInput, Button } from '../../form';
import { TableSliderFilter } from './table-slider-filter';
import { TableFacetedFilter } from './table-faceted-filter';
import { DataTableDateFilter } from './table-date-filter';
import { SearchBar } from '../../search-bar';
import { TableViewOptions } from './table-view-options';
import { TableToolbarProps } from '../types';
import { Badge } from '../../badges';
import { TableReport } from './data-table-report';
import { cn } from '../../../lib';

export function TableToolbar<TData>({
  table,
  title,
  totalItems,
  searchPlaceholder,
  ...props
}: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [toggleFilter, setToggleFilter] = useState(false);

  const columns = React.useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  const handleToggleFilter = useCallback(() => {
    setToggleFilter((prev) => !prev);
    if (isFiltered) {
      onReset();
    }
  }, [toggleFilter, onReset]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn('mb-2 flex w-full flex-col items-end gap-2 p-1')}
      {...props}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium">{title}</p>
          <Badge className="rounded-full text-sm font-normal">
            {totalItems}
          </Badge>
        </div>
        <div className="flex justify-end gap-2">
          <TableReport table={table} />
          <TableViewOptions table={table} />
          <Button
            aria-label="Reset filters"
            variant="subtle"
            size="sm"
            onClick={handleToggleFilter}
          >
            {isFiltered ? <FilterX /> : <FilterIcon />}
            {isFiltered ? 'لغو فیلتر' : 'فیلتر'}
          </Button>
          <div className="w-full lg:w-[300px]">
            <SearchBar searchPlaceholder={searchPlaceholder} />
          </div>
        </div>
      </div>
      {(toggleFilter || isFiltered) && (
        <div className="flex w-full justify-end gap-2">
          {columns.map((column) => (
            <DataTableToolbarFilter key={column.id} column={column} />
          ))}
        </div>
      )}
    </div>
  );
}

interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  const columnMeta = column.columnDef.meta;

  if (!columnMeta?.variant) return null;

  switch (columnMeta.variant) {
    case 'text':
      return (
        <AIBInput
          placeholder={columnMeta.placeholder ?? columnMeta.label}
          value={(column.getFilterValue() as string) ?? ''}
          onChange={(event) => column.setFilterValue(event.target.value)}
          className="h-8 w-40 lg:w-56"
        />
      );

    case 'range':
      return (
        <TableSliderFilter
          column={column}
          title={columnMeta.label ?? column.id}
        />
      );

    case 'date':
    case 'dateRange':
      return (
        <DataTableDateFilter
          column={column}
          title={columnMeta.label ?? column.id}
          multiple={columnMeta.variant === 'dateRange'}
        />
      );

    case 'select':
    case 'multiSelect':
      return (
        <TableFacetedFilter
          column={column}
          title={columnMeta.label ?? column.id}
          options={columnMeta.options ?? []}
          multiple={columnMeta.variant === 'multiSelect'}
        />
      );

    default:
      return null;
  }
}
