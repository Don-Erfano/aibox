'use client';
import { useCallback } from 'react';
import { TableFiltersFormProps } from '../types';
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
              variant="sm"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'number':
          return (
            <BaseTextField
              type="number"
              variant="sm"
              inputMode="numeric"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'date':
          return (
            <BaseTextField
              type="date"
              variant="sm"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'select':
          return (
            <BaseTextField
              type="date"
              variant="sm"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'multiSelect':
          return (
            <BaseTextField
              type="date"
              variant="sm"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
