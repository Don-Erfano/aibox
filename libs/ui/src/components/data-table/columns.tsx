import { useMemo } from 'react';
import { CustomCheckbox } from '../atoms/Checkbox';
import { IconButton } from '../atoms/CustomButton/IconButton';
import {
  DeleteIcon,
  DownChevronIcon,
  LeftChevronIcon,
  TextEditIcon,
} from '@/assets/icons';
import { ColumnDef, Table } from '@tanstack/react-table';
import { actionsProps } from './types';

/**
 * Hook to build table columns array with optional row-selection and operations.
 */
export function useTableColumns<T>(
  baseColumns: ColumnDef<T, any>[],
  options: {
    enableExpand?: boolean;
    enableSelection?: boolean;
    actions?: actionsProps<T>;
  }
): ColumnDef<T, any>[] {
  const { enableExpand, enableSelection, actions } = options;

  return useMemo(() => {
    const expandCol: ColumnDef<T, any> = {
      id: 'expand',
      cell: ({ row }: { row: any }) =>
        row.getCanExpand() ? (
          <IconButton
            aria-label={row.getIsExpanded() ? 'Expand' : 'Collapse'}
            onClick={row.getToggleExpandedHandler()}
            size="small"
            icon={
              row.getIsExpanded() ? <DownChevronIcon /> : <LeftChevronIcon />
            }
          />
        ) : null,
      size: 10,
    };

    const selectionCol: ColumnDef<T, any> = {
      id: 'select',
      header: ({ table }: { table: Table<T> }) =>
        enableSelection ? (
          <div>
            <CustomCheckbox
              checked={table.getIsAllRowsSelected()}
              indeterminate={table.getIsSomeRowsSelected()}
              onChange={table.getToggleAllRowsSelectedHandler()}
            />
          </div>
        ) : null,
      cell: ({ row }: { row: any }) =>
        enableSelection ? (
          <div>
            <CustomCheckbox
              checked={row.getIsSelected()}
              disabled={!row.getCanSelect()}
              onChange={row.getToggleSelectedHandler()}
            />
          </div>
        ) : null,
      size: 40,
    };

    const opsCol: ColumnDef<T, any> = {
      id: 'actions',
      header: actions ? 'عملیات' : undefined,
      cell: ({ row }: { row: any }) =>
        actions ? (
          <>
            {actions.onEdit && (
              <IconButton
                aria-label="Edit"
                onClick={() => actions.onEdit!(row.original)}
                icon={<TextEditIcon />}
              />
            )}
            {actions.onDelete && (
              <IconButton
                aria-label="Delete"
                onClick={() => actions.onDelete!(row.original)}
                icon={<DeleteIcon />}
              />
            )}
            {actions.customActions?.map((action, idx) => (
              <IconButton
                key={idx}
                aria-label={action.label}
                onClick={() => action.onClick(row.original)}
                icon={action.icon}
              />
            ))}
          </>
        ) : null,
      size: 120,
    };

    return [
      ...(enableExpand ? [expandCol] : []),
      ...(enableSelection ? [selectionCol] : []),
      ...baseColumns,
      ...(actions ? [opsCol] : []),
    ];
  }, [baseColumns, enableExpand, enableSelection, actions]);
}
