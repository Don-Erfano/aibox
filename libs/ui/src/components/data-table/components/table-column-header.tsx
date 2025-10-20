'use client';

import { flexRender, type Header } from '@tanstack/react-table';
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  ChevronsUpDown,
  X,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../dropdown-menu';
import { cn } from '../../../lib';

interface TableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  header: Header<TData, TValue>;
}

export function TableColumnHeader<TData, TValue>({
  header,
  className,
  ...props
}: TableColumnHeaderProps<TData, TValue>) {
  if (!header.column.getCanSort()) {
    return (
      <p
        className={cn('flex', {
          'justify-center': header.column.id === 'actions',
        })}
      >
        {header.isPlaceholder
          ? null
          : flexRender(header.column.columnDef.header, header.getContext())}
      </p>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        {...props}
        className={cn(
          'flex items-center gap-2 rounded-md border border-transparent px-2 py-1',
          '[&_svg]:size-4 [&_svg]:text-gray-500',
          {
            'cursor-pointer hover:border-teal-600/25 hover:bg-teal-600/12':
              header.column.getCanSort(),
            'border-teal-600/25 [&_svg]:text-teal-600':
              header.column.getIsSorted(),
          },
          className
        )}
      >
        <p>
          {header.isPlaceholder
            ? null
            : flexRender(header.column.columnDef.header, header.getContext())}
        </p>
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
        className="w-28 border border-border bg-white text-popover-foreground"
      >
        {header.column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className="relative pr-1 pl-8 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-gray-100 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12 [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 [&>span:first-child]:right-auto [&>span:first-child]:left-2"
              checked={header.column.getIsSorted() === 'asc'}
              onClick={() => header.column.toggleSorting(false)}
            >
              <ArrowUpNarrowWide strokeWidth={1.5} />
              صعودی
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="relative pr-1 pl-9 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-gray-100 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12 [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 [&>span:first-child]:right-auto [&>span:first-child]:left-2"
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
            className="relative pr-1 pl-9 hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[highlighted]:bg-gray-100 data-[state=checked]:text-teal-600 data-[state=checked]:hover:bg-teal-600/12 [&_svg]:text-muted-foreground data-[state=checked]:[&_svg]:text-teal-600 [&>span:first-child]:right-auto [&>span:first-child]:left-2"
            onClick={() => header.column.clearSorting()}
          >
            <X />
            پاکسازی
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
