import { CustomAutocomplete } from '@/components/atoms/Autocomplete';
import { CustomInput } from '@/components/atoms/CustomInput/CustomInput';
import { useCallback } from 'react';
import { TableToolbarFilterProps } from '../types';

export function DataTableToolbarFilter<TData>({
  column,
}: TableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    const onFilterRender = useCallback(() => {
      if (!columnMeta?.variant) return null;

      switch (columnMeta.variant) {
        case 'text':
          return (
            <CustomInput
              label={columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              endIcon={columnMeta.icon}
              fullWidth
            />
          );

        case 'number':
          return (
            <div className="relative">
              <CustomInput
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                fullWidth
              />
            </div>
          );

        case 'select':
          return (
            <CustomAutocomplete
              options={columnMeta.options ?? []}
              value={column.getFilterValue()}
              getOptionLabel={(option: any) => option?.label}
              onTextFieldChange={(event) =>
                column.setFilterValue(event.target.value)
              }
              label={columnMeta.label ?? column.id}
              fullWidth
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
