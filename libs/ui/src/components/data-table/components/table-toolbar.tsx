'use client';

import type { Table } from '@tanstack/react-table';
import { X } from 'lucide-react';

import { Button } from '../../button';
import { TableViewOptions } from './table-view-options';
import { cn } from '../../../lib';
import { useCallback, useMemo } from 'react';
import { TableFiltersForm } from './table-filters-form';

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = useMemo(
    () => table.getAllColumns().filter((column) => column.getCanFilter()),
    [table]
  );

  const onReset = useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  return (
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        'flex w-full items-start justify-between gap-2 p-1',
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns.map((column) => (
          <TableFiltersForm key={column.id} column={column} />
        ))}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Reset
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        {children}
        <TableViewOptions table={table} />
      </div>
    </div>
  );
}
