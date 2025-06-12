'use client';
import { useCallback } from 'react';
import { TableFiltersFormProps } from '../types';
import { AIBInput } from '../../form/input/input';
import { AibAutocomplete } from '../../form';

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
            <AIBInput
              type="text"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'number':
          return (
            <AIBInput
              type="number"
              inputMode="numeric"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'date':
          return (
            <AIBInput
              type="date"
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(e) => column.setFilterValue(e.target.value)}
            />
          );

        case 'select':
          return (
            <AibAutocomplete
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              variant="single"
              value={
                columnMeta.options?.find(
                  (o) => o.value === column.getFilterValue()
                )?.label
              }
              options={
                columnMeta.options?.map((option) => ({
                  label: option.label,
                  id: option.value,
                })) || []
              }
              onSelect={(val) =>
                column.setFilterValue(val.length ? val[0].id : '')
              }
              h_size="sm"
              mode="light"
            />
          );

        case 'multiSelect':
          return (
            <AibAutocomplete
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              variant="single"
              value={
                columnMeta.options?.find(
                  (o) => o.value === column.getFilterValue()
                )?.label
              }
              options={
                columnMeta.options?.map((option) => ({
                  label: option.label,
                  id: option.value,
                })) || []
              }
              onSelect={(val) => column.setFilterValue(val[0].id)}
              h_size="sm"
              mode="light"
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
