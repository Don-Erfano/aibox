'use client';
import { useCallback } from 'react';
import { Input } from '../../input';
import { cn } from '../../../lib';
import { TableFiltersFormProps } from '../types';
import { DatePicker } from '../../inputs/date-picker';
import { BaseTextField } from '../../inputs/textfield/baseTextField';

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
            <BaseTextField
              type="text"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'number':
          return (
            <BaseTextField
              type="number"
              inputMode="numeric"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'date':
          return (
            <DatePicker
              label={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(date) => column.setFilterValue(date)}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
