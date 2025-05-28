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
  if (!header.column.getCanSort()) {
    return (
      <p className="flex">
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
          'flex items-center gap-2 px-2 py-1 rounded-md border border-transparent',
          '[&_svg]:text-gray-500 [&_svg]:size-4',
          {
            'hover:bg-teal-600/12 hover:border-teal-600/25 cursor-pointer':
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
  );
}
