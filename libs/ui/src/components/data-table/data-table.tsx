'use client';

import React, { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronLeft } from 'lucide-react';

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
import { Button } from '../form';

export function DataTable<TData>({
  table,
  actionBar,
  childComponent: ChildComponent,
  className,
  ...props
}: DataTableProps<TData>) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const columnCount = table.getAllColumns().length;
  const hasData = table.getRowModel().rows?.length > 0;
  const hasExpandColumn = table
    .getAllColumns()
    .some((column) => column.id === 'expand');
  const hasSelectionColumn = table
    .getAllColumns()
    .some((column) => column.id === 'select');

  const mobileVisibleColumns = table
    .getAllColumns()
    .filter((col) => col.columnDef.meta?.mobileVisible && col.getIsVisible());

  const hiddenColumns = table
    .getAllColumns()
    .filter((col) => !col.columnDef.meta?.mobileVisible && col.getIsVisible());

  const toggleRowExpansion = (rowId: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block">
        <div
          data-slot="table-container"
          className={cn(
            'flex w-full flex-col gap-2.5 overflow-x-auto',
            className
          )}
          {...props}
        >
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header, headerIndex) => {
                    const columnDef = header.column.columnDef;
                    const size = header.getSize();
                    const isFirstColumn = headerIndex === 0;
                    const shouldAddPadding =
                      isFirstColumn && !hasExpandColumn && !hasSelectionColumn;

                    return (
                      <TableHead
                        key={header.id}
                        style={{
                          width: size,
                          maxWidth: columnDef.maxSize,
                          minWidth: columnDef.minSize,
                        }}
                        colSpan={header.colSpan}
                        className={cn(
                          'overflow-hidden text-ellipsis whitespace-nowrap',
                          {
                            'px-2': !header.column.getCanSort(),
                            'pr-5': shouldAddPadding,
                          }
                        )}
                        data-debug={
                          shouldAddPadding ? 'has-padding' : 'no-padding'
                        }
                      >
                        <TableColumnHeader header={header} />
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody>
              {hasData ? (
                table.getRowModel().rows.map((row) => (
                  <React.Fragment key={row.id}>
                    <TableRow
                      data-state={row.getIsSelected() && 'selected'}
                      data-expanded={row.getIsExpanded()}
                    >
                      {row.getVisibleCells().map((cell, cellIndex) => {
                        const columnDef = cell.column.columnDef;
                        const size = cell.column.getSize();
                        const isFirstColumn = cellIndex === 0;

                        const shouldAddPadding =
                          isFirstColumn &&
                          !hasExpandColumn &&
                          !hasSelectionColumn;

                        return (
                          <TableCell
                            key={cell.id}
                            style={{
                              width: size,
                              maxWidth: columnDef.maxSize,
                              minWidth: columnDef.minSize,
                            }}
                            className={cn(
                              'overflow-hidden text-ellipsis whitespace-nowrap',
                              {
                                'pr-5': shouldAddPadding,
                              }
                            )}
                            data-debug={
                              shouldAddPadding ? 'has-padding' : 'no-padding'
                            }
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
                          {ChildComponent && (
                            <ChildComponent row={row.original} />
                          )}
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
      </div>

      {/* Mobile Table */}
      <div className="block md:hidden w-full overflow-hidden">
        <div className="w-full overflow-x-hidden">
          <Table className="w-full table-fixed">
            <TableHeader>
              <TableRow>
                {hiddenColumns.length > 0 && (
                  <TableHead className="w-12 flex-shrink-0 p-2" />
                )}
                {mobileVisibleColumns.map((col) => (
                  <TableHead key={col.id} className="min-w-0 px-2 truncate">
                    {col.columnDef.header as string}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hasData ? (
                table.getRowModel().rows.map((row) => {
                  const isRowExpanded = expandedRows.has(row.id);

                  return (
                    <React.Fragment key={row.id}>
                      {/* Main row with visible columns + expand button */}
                      <TableRow>
                        {hiddenColumns.length > 0 && (
                          <TableCell className="w-12 p-2 flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleRowExpansion(row.id)}
                              className="h-8 w-8 p-0 flex-shrink-0"
                            >
                              {isRowExpanded ? (
                                <ChevronDown className="h-4 w-4" />
                              ) : (
                                <ChevronLeft className="h-4 w-4" />
                              )}
                            </Button>
                          </TableCell>
                        )}

                        {mobileVisibleColumns.map((col) => {
                          const cell = row
                            .getAllCells()
                            .find((c) => c.column.id === col.id);
                          if (!cell) return null;

                          return (
                            <TableCell
                              key={col.id}
                              className="min-w-0 overflow-hidden px-2"
                            >
                              <div>
                                {flexRender(
                                  col.columnDef.cell,
                                  cell.getContext()
                                )}
                              </div>
                            </TableCell>
                          );
                        })}
                      </TableRow>

                      {/* Expanded row with hidden columns */}
                      {isRowExpanded && hiddenColumns.length > 0 && (
                        <TableRow className="bg-muted/20">
                          <TableCell
                            colSpan={
                              mobileVisibleColumns.length +
                              (hiddenColumns.length > 0 ? 1 : 0)
                            }
                            className="p-4"
                          >
                            <div className="space-y-3 w-full">
                              {/* Child component expansion (moved to top) */}
                              {ChildComponent && (
                                <div className="w-full overflow-hidden mb-4 pb-3 border-b border-border">
                                  <ChildComponent row={row.original} />
                                </div>
                              )}

                              {/* Hidden columns */}
                              {hiddenColumns.map((col) => {
                                const cell = row
                                  .getAllCells()
                                  .find(
                                    (c) =>
                                      c.column.id === col.id &&
                                      col.id !== 'expand'
                                  );
                                if (!cell) return null;

                                // Check if this is the actions column
                                const isActionsColumn = col.id === 'actions';

                                return (
                                  <div
                                    key={col.id}
                                    className={cn(
                                      'w-full',
                                      isActionsColumn
                                        ? ''
                                        : 'flex flex-row items-center justify-between gap-3'
                                    )}
                                  >
                                    {!isActionsColumn && (
                                      <span className="text-sm font-medium text-state-800 flex-shrink-0 min-w-0">
                                        {col.columnDef.header as string}:
                                      </span>
                                    )}
                                    <div
                                      className={cn(
                                        'text-sm',
                                        isActionsColumn
                                          ? 'w-full'
                                          : 'break-words'
                                      )}
                                    >
                                      {flexRender(
                                        col.columnDef.cell,
                                        cell.getContext()
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={
                      mobileVisibleColumns.length +
                      (hiddenColumns.length > 0 ? 1 : 0)
                    }
                    className="text-center py-8"
                  >
                    <NoData />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile pagination */}
        <div className="mt-4 w-full">
          <TablePagination table={table} />
          {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="mt-3 w-full">{actionBar}</div>
          )}
        </div>
      </div>
    </>
  );
}
