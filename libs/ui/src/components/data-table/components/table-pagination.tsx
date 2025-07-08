import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './../../form/select';
import { cn } from '../../../lib';
import { TablePaginationProps } from '../types';
import { Button } from '../../form';

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
      <div className="hidden sm:flex flex-1 whitespace-nowrap text-muted-foreground text-sm">
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap font-normal text-sm text-zinc-600">
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
      <div className="flex sm:hidden w-full items-center justify-between">
        <div className="flex items-center justify-center text-sm font-normal text-zinc-600">
          صفحه {table.getState().pagination.pageIndex + 1} از{' '}
          {table.getPageCount()}
        </div>
        <div className="flex items-center gap-1 flex-row-reverse">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="lg:flex border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>

      {/* Desktop - Pagination buttons */}
      <div className="hidden sm:flex flex-col-reverse items-center gap-4 sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex items-center gap-1 flex-row-reverse">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="hidden lg:flex border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-gray-400/80 border-1 text-zinc-600"
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
