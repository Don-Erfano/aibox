import { useMemo } from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  SquarePen,
  Trash,
} from 'lucide-react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { actionsProps } from './types';
import { Button } from '../form';
import { Checkbox } from '../form/checkbox';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './../tooltip';
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
            aria-label={row.getIsExpanded() ? 'Collapse' : 'Expand'}
            onClick={row.getToggleExpandedHandler()}
            size="icon"
            variant="ghost"
          >
            {row.getIsExpanded() ? <ChevronDownIcon /> : <ChevronLeftIcon />}
          </Button>
        ) : null,
      size: 56,
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
          <TooltipProvider>
            <div className="flex gap-0.5 justify-center">
              {actions.onEdit && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label="Edit"
                      variant="ghost"
                      onClick={() => actions.onEdit!(row.original)}
                      size="icon"
                    >
                      <SquarePen strokeWidth={1.5} className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6}>
                    <p>ویرایش</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {actions.onDelete && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label="Delete"
                      variant="ghost"
                      onClick={() => actions.onDelete!(row.original)}
                      size="icon"
                    >
                      <Trash strokeWidth={1.5} className="size-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6}>
                    <p>حذف</p>
                  </TooltipContent>
                </Tooltip>
              )}
              {actions.customActions?.map((action, idx) => (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild>
                    <Button
                      aria-label={action.label}
                      size="icon"
                      variant="ghost"
                      onClick={() => action.onClick(row.original)}
                    >
                      {action.icon}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={6}>
                    <p>{action.label}</p>
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </TooltipProvider>
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
