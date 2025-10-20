import { cn } from '../../../lib';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../table';
import { ComponentProps } from 'react';

interface DataTableSkeletonProps extends ComponentProps<'div'> {
  columnCount: number;
  rowCount?: number;
  filterCount?: number;
  cellWidths?: string[];
  withViewOptions?: boolean;
  withPagination?: boolean;
  shrinkZero?: boolean;
}

export function DataTableSkeleton({
  columnCount,
  rowCount = 10,
  cellWidths = ['auto'],
  withPagination = true,
  shrinkZero = false,
  className,
  ...props
}: DataTableSkeletonProps) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? 'auto'
  );

  return (
    <div
      className={cn('flex w-full flex-col gap-2.5 overflow-x-auto', className)}
      {...props}
    >
      <Table>
        <TableHeader>
          {Array.from({ length: 1 }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <TableHead
                  key={cellIndex}
                  style={{
                    width: cozyCellWidths[cellIndex],
                    minWidth: shrinkZero ? cozyCellWidths[cellIndex] : 'auto',
                  }}
                >
                  <div className="h-5 w-full animate-pulse rounded-md bg-gray-100" />
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {Array.from({ length: rowCount }).map((_, i) => (
            <TableRow key={i} className="hover:bg-transparent">
              {Array.from({ length: columnCount }).map((_, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  style={{
                    width: cozyCellWidths[cellIndex],
                    minWidth: shrinkZero ? cozyCellWidths[cellIndex] : 'auto',
                  }}
                >
                  <div className="h-5 w-full animate-pulse rounded-md bg-gray-100" />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {withPagination ? (
        <div className="flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8">
          <div className="flex-1 text-sm whitespace-nowrap">
            <div className="flex items-center space-x-2 rtl:space-x-reverse">
              <div className="h-5 w-28 animate-pulse rounded-md bg-gray-100" />
              <div className="h-10 w-16 animate-pulse rounded-md bg-gray-100" />
              <div className="h-5 w-24 animate-pulse rounded-md bg-gray-100" />
            </div>
          </div>

          <div className="flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
            <div className="flex flex-row-reverse items-center gap-1">
              <div className="hidden h-10 w-10 animate-pulse rounded-md bg-gray-100 lg:block" />
              <div className="h-10 w-10 animate-pulse rounded-md bg-gray-100" />
              <div className="h-10 w-10 animate-pulse rounded-md bg-gray-100" />
              <div className="hidden h-10 w-10 animate-pulse rounded-md bg-gray-100 lg:block" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
