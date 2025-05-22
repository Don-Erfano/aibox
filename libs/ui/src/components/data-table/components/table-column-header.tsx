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
        : flexRender(header.column.columnDef.header, header.getContext())}{' '}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            '-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 focus:outline-none data-[state=open]:text-accent [&_svg]:size-4 [&_svg]:shrink-0',
            {
              '[&_svg]:text-teal-600': header.column.getIsSorted(),
              '[&_svg]:text-muted-foreground': !header.column.getIsSorted(),
            },
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
        <DropdownMenuContent
          align="end"
          className="w-28 bg-white text-popover-foreground border border-border"
        >
          {header.column.getCanSort() && (
            <>
              <DropdownMenuCheckboxItem
                className="relative pl-8 pr-1 [&>span:first-child]:left-2 [&>span:first-child]:right-auto data-[highlighted]:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12"
                checked={header.column.getIsSorted() === 'asc'}
                onClick={() => header.column.toggleSorting(false)}
              >
                <ArrowUpNarrowWide strokeWidth={1.5} />
                صعودی
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                className="relative pl-9 pr-1 [&>span:first-child]:left-2 [&>span:first-child]:right-auto data-[highlighted]:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12"
                checked={header.column.getIsSorted() === 'desc'}
                onClick={() => header.column.toggleSorting(true)}
              >
                <ArrowDownWideNarrow strokeWidth={1.5} />
                نزولی
              </DropdownMenuCheckboxItem>
            </>
          )}

          {header.column.getIsSorted() && (
            <DropdownMenuCheckboxItem
              className="relative pl-9 pr-1 [&>span:first-child]:left-2 [&>span:first-child]:right-auto data-[highlighted]:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12"
              onClick={() => header.column.clearSorting()}
            >
              <X />
              پاکسازی
            </DropdownMenuCheckboxItem>
          )}
          {header.column.getCanHide() && (
            <DropdownMenuCheckboxItem
              className="relative pl-9 pr-1 [&>span:first-child]:left-2 [&>span:first-child]:right-auto data-[highlighted]:bg-gray-100 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12"
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
