'use client';

import { flexRender, type Header } from '@tanstack/react-table';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  EyeOff,
  X,
} from 'lucide-react';
import { cn } from '../../../lib';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../../dropdown-menu';

interface TableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  header: Header<TData, TValue>;
}

export function TableColumnHeader<TData, TValue>({
  header,
  className,
  ...props
}: TableColumnHeaderProps<TData, TValue>) {
  return (
    <div className="flex items-center gap-1">
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            '-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none data-[state=open]:text-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground',
            className
          )}
          {...props}
        >
          {header.column.getCanSort() &&
            (header.column.getIsSorted() === 'desc' ? (
              <ArrowDownWideNarrow strokeWidth={1.5} />
            ) : header.column.getIsSorted() === 'asc' ? (
              <ArrowUpNarrowWide strokeWidth={1.5} />
            ) : (
              <ChevronsUpDown />
            ))}
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-28">
          {header.column.getCanSort() && (
            <>
              <DropdownMenuCheckboxItem
                className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                checked={header.column.getIsSorted() === 'asc'}
                onClick={() => header.column.toggleSorting(false)}
              >
                <ArrowUpNarrowWide strokeWidth={1.5} />
                صعودی
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
                checked={header.column.getIsSorted() === 'desc'}
                onClick={() => header.column.toggleSorting(true)}
              >
                <ArrowDownWideNarrow strokeWidth={1.5} />
                نزولی
              </DropdownMenuCheckboxItem>
              {header.column.getIsSorted() && (
                <DropdownMenuItem
                  className="pl-2 [&_svg]:text-muted-foreground"
                  onClick={() => header.column.clearSorting()}
                >
                  <X />
                  پاکسازی
                </DropdownMenuItem>
              )}
            </>
          )}
          {header.column.getCanHide() && (
            <DropdownMenuCheckboxItem
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              checked={!header.column.getIsVisible()}
              onClick={() => header.column.toggleVisibility(false)}
            >
              <EyeOff />
              مخفی
            </DropdownMenuCheckboxItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
