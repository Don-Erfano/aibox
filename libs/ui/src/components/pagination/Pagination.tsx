'use client';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { PaginationProps } from './interface';
import { FC } from 'react';
import { cn } from '../../lib';
import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../form';

const Pagination: FC<PaginationProps> = ({
  page,
  pageSize,
  pageCount,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 30, 50],
  className,
}) => {
  const canPreviousPage = page > 1;
  const canNextPage = page < pageCount;

  return (
    <div
      className={cn(
        'flex w-full flex-col-reverse items-center justify-between gap-4 overflow-auto p-1 sm:flex-row sm:gap-8',
        className
      )}
    >
      <div className="hidden flex-1 text-sm whitespace-nowrap text-muted-foreground sm:flex">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-normal whitespace-nowrap text-zinc-600">
            نمایش در هر صفحه
          </p>
          <Select
            value={`${pageSize}`}
            dir="rtl"
            onValueChange={(value) => {
              onPageSizeChange?.(Number(value));
            }}
          >
            <SelectTrigger className="h-10 w-[4rem] [&[data-size]]:h-10">
              <SelectValue placeholder={`${pageSize}`} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center justify-center text-sm font-normal text-zinc-600">
            صفحه {page} از {pageCount || 1}
          </div>
        </div>
      </div>

      <div className="flex w-full items-center justify-between sm:hidden">
        <div className="flex items-center justify-center text-sm font-normal text-zinc-600">
          صفحه {page} از {pageCount || 1}
        </div>
        <div className="flex flex-row-reverse items-center gap-1">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(pageCount)}
            disabled={!canNextPage}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>

      <div className="hidden flex-col-reverse items-center gap-4 sm:flex sm:flex-row sm:gap-6 lg:gap-8">
        <div className="flex flex-row-reverse items-center gap-1">
          <Button
            aria-label="صفحه اول"
            variant="ghost"
            size="icon"
            className="hidden border-1 border-gray-400/80 text-zinc-600 lg:flex"
            onClick={() => onPageChange(1)}
            disabled={!canPreviousPage}
          >
            <ChevronsLeft />
          </Button>
          <Button
            aria-label="قبلی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(page - 1)}
            disabled={!canPreviousPage}
          >
            <ChevronLeft />
          </Button>
          <Button
            aria-label="بعدی"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(page + 1)}
            disabled={!canNextPage}
          >
            <ChevronRight />
          </Button>
          <Button
            aria-label="صفحه آخر"
            variant="ghost"
            size="icon"
            className="border-1 border-gray-400/80 text-zinc-600"
            onClick={() => onPageChange(pageCount)}
            disabled={!canNextPage}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default Pagination;
