'use client';

import {
  type ColumnFiltersState,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Updater,
  type VisibilityState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { parseAsInteger, parseAsString, useQueryState } from 'nuqs';
import { useTableColumns } from '../columns';
import { UseTableProps } from '../types';
import { useCallback, useMemo, useState } from 'react';

export function useDataTable<TData>(props: UseTableProps<TData>) {
  const {
    columns,
    enableRowSelection,
    pageCount = -1,
    initialState,
    history = 'replace',
    clearOnDefault = false,
    shallow = true,
    enableExpand,
    actions,
    ...tableProps
  } = props;

  const queryStateOptions = useMemo(
    () => ({
      history,
      shallow,
      clearOnDefault,
    }),
    [history, shallow, clearOnDefault]
  );

  const [page, setPage] = useQueryState(
    'pageNo',
    parseAsInteger.withOptions(queryStateOptions).withDefault(1)
  );

  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState?.columnVisibility ?? {}
  );

  const [perPage, setPerPage] = useQueryState(
    'pageSize',
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  );

  const pagination: PaginationState = useMemo(() => {
    return {
      pageIndex: page - 1,
      pageSize: perPage,
    };
  }, [page, perPage]);

  const onPaginationChange = useCallback(
    (updaterOrValue: Updater<PaginationState>) => {
      if (typeof updaterOrValue === 'function') {
        const newPagination = updaterOrValue(pagination);
        void setPage(newPagination.pageIndex + 1);
        void setPerPage(newPagination.pageSize);
      } else {
        void setPage(updaterOrValue.pageIndex + 1);
        void setPerPage(updaterOrValue.pageSize);
      }
    },
    [pagination, setPage, setPerPage]
  );

  const [sortBy, setSortBy] = useQueryState(
    'sortBy',
    parseAsString.withOptions(queryStateOptions)
  );

  const [orderBy, setOrderBy] = useQueryState(
    'orderBy',
    parseAsString.withOptions(queryStateOptions)
  );

  const sorting: SortingState = useMemo(() => {
    if (!sortBy) return [];
    return [
      {
        id: sortBy,
        desc: orderBy === 'desc',
      },
    ];
  }, [sortBy, orderBy]);

  const onSortingChange = useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(sorting)
          : updaterOrValue;

      if (newSorting.length > 0) {
        void setSortBy(newSorting[0].id);
        void setOrderBy(newSorting[0].desc ? 'desc' : 'asc');
      } else {
        void setSortBy(null);
        void setOrderBy(null);
      }
    },
    [sorting, setSortBy, setOrderBy]
  );

  // Keep track of column filters state
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  // Handle column filter changes (this happens as user types/selects)
  const onColumnFiltersChange = useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;
        return next;
      });
    },
    []
  );

  const tableColumns = useTableColumns(columns, {
    enableExpand,
    enableSelection: enableRowSelection,
    actions,
  });

  const table = useReactTable({
    ...tableProps,
    columns: tableColumns,
    initialState: {
      ...initialState,
    },
    pageCount,
    state: {
      pagination,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    defaultColumn: {
      ...tableProps.defaultColumn,
      enableColumnFilter: false,
    },
    enableRowSelection: true,
    getRowCanExpand: () => true,
    onRowSelectionChange: setRowSelection,
    onPaginationChange,
    onSortingChange,
    onColumnFiltersChange,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
  });

  return {
    table,
    rowSelection,
    setPage,
  };
}
