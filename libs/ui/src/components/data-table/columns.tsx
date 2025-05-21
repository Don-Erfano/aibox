import { useMemo } from 'react';
import {
  DeleteIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  EditIcon,
} from 'lucide-react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { actionsProps } from './types';
import { Button } from '../button';
import { Checkbox } from '../form/checkbox';

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
          <Button
            aria-label={row.getIsExpanded() ? 'Expand' : 'Collapse'}
            onClick={row.getToggleExpandedHandler()}
            size="icon"
          >
            {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronLeftIcon />}
          </Button>
        ) : null,
      size: 10,
    };

    const selectionCol: ColumnDef<T, any> = {
      id: 'select',
      header: ({ table }: { table: Table<T> }) =>
        enableSelection ? (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ) : null,
      cell: ({ row }: { row: any }) =>
        enableSelection ? (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
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
              <Button
                aria-label="Edit"
                onClick={() => actions.onEdit!(row.original)}
                size="icon"
              >
                <EditIcon />
              </Button>
            )}
            {actions.onDelete && (
              <Button
                aria-label="Delete"
                onClick={() => actions.onDelete!(row.original)}
                size="icon"
              >
                <DeleteIcon />
              </Button>
            )}
            {actions.customActions?.map((action, idx) => (
              <Button
                key={idx}
                aria-label={action.label}
                size="icon"
                onClick={() => action.onClick(row.original)}
              >
                {action.icon}
              </Button>
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
