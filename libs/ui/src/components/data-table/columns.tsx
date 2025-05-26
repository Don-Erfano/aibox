import { useMemo } from 'react';
import {
  DeleteIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  SquarePen,
} from 'lucide-react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { actionsProps } from './types';
import { Checkbox } from '../form/checkbox';
import { Button } from '../form';
import { cn } from '../../lib';

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
            key={row.id}
            aria-label={row.getIsExpanded() ? 'Expand' : 'Collapse'}
            onClick={row.getToggleExpandedHandler()}
            size="icon"
            variant="ghost"
          >
            {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronLeftIcon />}
          </Button>
        ) : null,
      size: 10,
    };

    const selectionCol: ColumnDef<T, any> = {
      id: 'select',
      header: ({ table }: { table: Table<T> }) => {
        const allSelected = table.getIsAllPageRowsSelected();
        const someSelected = table.getIsSomePageRowsSelected();
        const shouldShow = allSelected || someSelected;

        return (
          <Checkbox
            checked={allSelected || (someSelected && 'indeterminate')}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className={cn(
              'translate-y-0.5',
              shouldShow ? 'visible' : 'invisible'
            )}
          />
        );
      },
      cell: ({ row }: { row: any }) =>
        enableSelection ? (
          <Checkbox
            key={row.id}
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
          <div className="flex gap-2">
            {actions.onEdit && (
              <Button
                aria-label="Edit"
                variant="ghost"
                onClick={() => actions.onEdit!(row.original)}
                size="icon"
              >
                <SquarePen strokeWidth={1.5} className="size-5" />
              </Button>
            )}
            {actions.onDelete && (
              <Button
                aria-label="Delete"
                variant="ghost"
                onClick={() => actions.onDelete!(row.original)}
                size="icon"
              >
                <DeleteIcon strokeWidth={1.5} className="size-5" />
              </Button>
            )}
            {actions.customActions?.map((action, idx) => (
              <Button
                key={idx}
                aria-label={action.label}
                size="icon"
                variant="ghost"
                onClick={() => action.onClick(row.original)}
              >
                {action.icon}
              </Button>
            ))}
          </div>
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
