'use client';

import React, { useState } from 'react';
import { flexRender } from '@tanstack/react-table';
import { ChevronDown, ChevronRight } from 'lucide-react';

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
      <div className="block md:hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {mobileVisibleColumns.map((col) => (
                <TableHead key={col.id}>
                  {col.columnDef.header as string}
                </TableHead>
              ))}
              {/* Add expand column header if there are hidden columns */}
              {hiddenColumns.length > 0 && (
                <TableHead className="w-10"></TableHead>
              )}
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
                      {mobileVisibleColumns.map((col) => {
                        const cell = row
                          .getAllCells()
                          .find((c) => c.column.id === col.id);
                        if (!cell) return null;

                        return (
                          <TableCell key={col.id}>
                            {flexRender(col.columnDef.cell, cell.getContext())}
                          </TableCell>
                        );
                      })}

                      {/* Expand button cell - only show if there are hidden columns */}
                      {hiddenColumns.length > 0 && (
                        <TableCell className="w-10 p-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => toggleRowExpansion(row.id)}
                            className="h-8 w-8 p-0"
                          >
                            {isRowExpanded ? (
                              <ChevronDown className="h-4 w-4" />
                            ) : (
                              <ChevronRight className="h-4 w-4" />
                            )}
                          </Button>
                        </TableCell>
                      )}
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
                          <div className="space-y-3">
                            {hiddenColumns.map((col) => {
                              const cell = row
                                .getAllCells()
                                .find((c) => c.column.id === col.id);
                              if (!cell) return null;

                              return (
                                <div
                                  key={col.id}
                                  className="flex items-center gap-3"
                                >
                                  <span className="text-sm font-medium text-muted-foreground min-w-0 flex-shrink-0">
                                    {col.columnDef.header as string}:
                                  </span>
                                  <div className="text-sm flex-1">
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

                    {/* Child component expansion (original table expansion) */}
                    {row.getIsExpanded() && ChildComponent && (
                      <TableRow className="h-5">
                        <TableCell
                          colSpan={
                            mobileVisibleColumns.length +
                            (hiddenColumns.length > 0 ? 1 : 0)
                          }
                        >
                          <ChildComponent row={row.original} />
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
                >
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Mobile pagination */}
        <div className="mt-4">
          <TablePagination table={table} />
          {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && (
            <div className="mt-3">{actionBar}</div>
          )}
        </div>
      </div>
    </>
  );
}
