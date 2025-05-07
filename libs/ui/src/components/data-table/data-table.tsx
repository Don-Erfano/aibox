'use client';

import React from 'react';
import { flexRender } from '@tanstack/react-table';

import { TablePagination } from './components/table-pagination';
import { TableColumnHeader } from './components/table-column-header';
import { cn } from '../../lib';
import { DataTableProps } from './types';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../table';
import { TableActionBar } from './components/table-action-bar';

export function DataTable<TData>({
  table,
  actionBar,
  childComponent: ChildComponent,
  className,
  ...props
}: DataTableProps<TData>) {
  return (
    <div
      className={cn('flex w-full flex-col gap-2.5 overflow-auto', className)}
      {...props}
    >
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    style={{ width: header.getSize() }}
                    colSpan={header.colSpan}
                  >
                    <TableColumnHeader header={header} />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr data-selected={row.getIsSelected() ? '' : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
                {row.getIsExpanded() && (
                  <tr>
                    <td colSpan={row.getVisibleCells().length}>
                      {ChildComponent && <ChildComponent row={row.original} />}
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>

        <TablePagination table={table} />
      </div>

      {actionBar &&
        table.getFilteredSelectedRowModel().rows.length > 0 &&
        actionBar}
    </div>
  );
}
