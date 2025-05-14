'use client';
import { useCallback } from 'react';
import { Input } from '../../input';
import { cn } from '../../../lib';
import { TableFiltersFormProps } from '../types';

export function TableFiltersForm<TData>({
  column,
}: TableFiltersFormProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="h-8 w-40 lg:w-56"
            />
          );

        case 'number':
          return (
            <div className="relative">
              <Input
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-8 w-[120px]')}
              />
            </div>
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
