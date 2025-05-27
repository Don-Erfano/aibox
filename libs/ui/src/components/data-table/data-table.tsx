'use client';

import React from 'react';
import { flexRender } from '@tanstack/react-table';

import { TablePagination } from './components/table-pagination';
import { TableColumnHeader } from './components/table-column-header';
import { cn } from '../../lib';
import { DataTableProps } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../table';
import { NoData } from '../no-data';

const TableSkeleton = ({
  columnCount,
  rowCount = 10,
}: {
  columnCount: number;
  rowCount?: number;
}) => (
  <>
    {Array.from({ length: rowCount }).map((_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {Array.from({ length: columnCount }).map((_, cellIndex) => (
          <TableCell key={`skeleton-cell-${cellIndex}`} className="h-10">
            <div className="h-4 bg-gray-100 rounded animate-pulse" />
          </TableCell>
        ))}
      </TableRow>
    ))}
  </>
);

export function DataTable<TData>({
  table,
  actionBar,
  childComponent: ChildComponent,
  className,
  isLoading = false,
  loadingRowCount = 10,
  ...props
}: DataTableProps<TData> & {
  isLoading?: boolean;
  loadingRowCount?: number;
}) {
  const columnCount = table.getAllColumns().length;
  const hasData = table.getRowModel().rows?.length > 0;

  return (
    <div
      data-slot="table-container"
      className={cn('flex w-full flex-col gap-2.5 overflow-x-auto', className)}
      {...props}
    >
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const columnDef = header.column.columnDef;
                const size = header.getSize();

                return (
                  <TableHead
                    key={header.id}
                    style={{
                      width: size,
                      maxWidth: columnDef.maxSize,
                      minWidth: columnDef.minSize,
                    }}
                    colSpan={header.colSpan}
                    className="overflow-hidden text-ellipsis whitespace-nowrap"
                  >
                    <TableColumnHeader header={header} />
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            <TableSkeleton
              columnCount={columnCount}
              rowCount={loadingRowCount}
            />
          ) : hasData ? (
            table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => {
                    const columnDef = cell.column.columnDef;
                    const size = cell.column.getSize();

                    return (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: size,
                          maxWidth: columnDef.maxSize,
                          minWidth: columnDef.minSize,
                        }}
                        className="overflow-hidden text-ellipsis whitespace-nowrap"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
                {row.getIsExpanded() && (
                  <TableRow className="h-5">
                    <TableCell colSpan={row.getVisibleCells().length}>
                      {ChildComponent && <ChildComponent row={row.original} />}
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columnCount} className="py-18">
                <NoData />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <div className="flex flex-col gap-2.5">
        <TablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  );
}
