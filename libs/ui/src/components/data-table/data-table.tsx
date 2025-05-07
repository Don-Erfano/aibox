'use client';

import React, { ReactElement } from 'react';
import { flexRender } from '@tanstack/react-table';
import { TableProps } from './types';
import {
  Table,
  TableBody,
  TableHeader,
  TableContainer,
  ActionBarContainer,
} from './styled';

import { DataTablePagination } from './components/table-pagination';
import { DataTableColumnHeader } from './components/table-column-header';

export const DataTable = <T,>({
  table,
  actionBar,
  ChildComponent,
}: TableProps<T>): ReactElement => {
  return (
    <>
      <TableContainer>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    colSpan={header.colSpan}
                  >
                    <DataTableColumnHeader header={header} />
                  </th>
                ))}
              </tr>
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

        <DataTablePagination table={table} />
      </TableContainer>

      {actionBar && table.getFilteredSelectedRowModel().rows.length > 0 && (
        <ActionBarContainer>{actionBar}</ActionBarContainer>
      )}
    </>
  );
};
