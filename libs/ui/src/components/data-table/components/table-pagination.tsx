import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../form';
import { cn } from '../../../lib';
import { TablePaginationProps } from '../types';

export function TablePagination<TData>({
  table,
  pageSizeOptions = [10, 20, 30, 50],
  className,
  ...props
}: TablePaginationProps<TData>) {
  return (
    <div
      className={cn(
        'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
        className
      )}
      {...props}
    >
      {/* Desktop - Show per page section */}
      <div className="hidden flex-1 text-sm whitespace-nowrap text-muted-foreground sm:flex">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-normal whitespace-nowrap text-zinc-600">
            نمایش در هر صفحه
          </p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            dir="rtl"
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-10 w-[4rem] [&[data-size]]:h-10">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-center text-sm font-normal text-zinc-600">
            صفحه {table.getState().pagination.pageIndex + 1} از{' '}
            {table.getPageCount()}
          </div>
        </div>
      </div>

      {/* Mobile - Show page info and pagination with justify-between */}
      <div className="flex w-full items-center justify-between sm:hidden">
        <div className="flex items-center justify-center text-sm font-normal text-zinc-600">
          صفحه {table.getState().pagination.pageIndex + 1} از{' '}
          {table.getPageCount()}
        </div>
        <div className="flex flex-row-reverse items-center gap-1">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>

      {/* Desktop - Pagination buttons */}
      <div className="hidden flex-col-reverse items-center gap-4 sm:flex sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex flex-row-reverse items-center gap-1">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="hidden border-1 border-gray-400/80 text-zinc-600 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
