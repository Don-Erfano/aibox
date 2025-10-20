'use client';

import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  type PaginationState,
  type RowSelectionState,
  type SortingState,
  type Updater,
  useReactTable,
  type VisibilityState,
} from '@tanstack/react-table';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  type Parser,
  useQueryState,
  type UseQueryStateOptions,
  useQueryStates,
} from 'nuqs';
import * as React from 'react';
import { UseTableProps } from '../types';
import { useTableColumns } from '../columns';
import { useDebouncedCallback } from '../../../hooks';

const PAGE_KEY = 'page';
const PER_PAGE_KEY = 'page_size';
const ARRAY_SEPARATOR = ',';

// function formatDateToMiladi(date: Date): string {
//   // Use UTC for consistent formatting when sending to backend if backend expects UTC date strings
//   const year = date.getUTCFullYear();
//   const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
//   const day = date.getUTCDate().toString().padStart(2, "0");
//   return `${year}-${month}-${day}`;
// }

function parseMiladiToTimestamp(
  dateString: string | string[]
): number | undefined {
  if (!dateString) return undefined;
  const dateStr = Array.isArray(dateString) ? dateString[0] : dateString;

  // Create date based on local timezone to preserve the intended calendar day
  const date = new Date(dateStr);
  return !isNaN(date.getTime()) ? date.getTime() : undefined;
}

function timestampToMiladi(timestamp: number): string {
  // Convert timestamp back to a Date object, then extract local date components
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}

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
    debounceMs = 300,
    ...tableProps
  } = props;

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, 'parse'>
  >(
    () => ({
      history,
      shallow,
      debounceMs,
      clearOnDefault,
    }),
    [history, shallow, debounceMs, clearOnDefault]
  );

  const [page, setPage] = useQueryState(
    PAGE_KEY,
    parseAsInteger.withOptions(queryStateOptions).withDefault(1)
  );

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>(
    initialState?.rowSelection ?? {}
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>(initialState?.columnVisibility ?? {});

  const [perPage, setPerPage] = useQueryState(
    PER_PAGE_KEY,
    parseAsInteger
      .withOptions(queryStateOptions)
      .withDefault(initialState?.pagination?.pageSize ?? 10)
  );

  const pagination: PaginationState = React.useMemo(() => {
    return {
      pageIndex: page - 1,
      pageSize: perPage,
    };
  }, [page, perPage]);

  const onPaginationChange = React.useCallback(
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

  const [orderBy, setOrderBy] = useQueryState(
    'ordering',
    parseAsString.withOptions(queryStateOptions)
  );

  const sorting: SortingState = React.useMemo(() => {
    if (!orderBy) return [];
    const isDesc = orderBy.startsWith('-');
    const id = isDesc ? orderBy.slice(1) : orderBy;
    return [{ id, desc: isDesc }];
  }, [orderBy]);

  const onSortingChange = React.useCallback(
    (updaterOrValue: Updater<SortingState>) => {
      const newSorting =
        typeof updaterOrValue === 'function'
          ? updaterOrValue(sorting)
          : updaterOrValue;
      if (newSorting.length > 0) {
        const { id, desc } = newSorting[0];
        void setOrderBy(desc ? `-${id}` : id);
      } else {
        void setOrderBy(null);
      }
    },
    [sorting, setOrderBy]
  );

  const filterableColumns = React.useMemo(() => {
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns]);

  const filterParsers = React.useMemo(() => {
    const parsers: Record<string, Parser<string> | Parser<string[]>> = {};
    filterableColumns.forEach((column) => {
      const columnId = column.id ?? '';
      const isDateRange = column.meta?.variant === 'dateRange';
      const isRange = column.meta?.variant === 'range';
      const hasOptions = !!column.meta?.options;

      if (hasOptions) {
        parsers[columnId] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR
        ).withOptions(queryStateOptions);
      } else if (isDateRange) {
        parsers[`${columnId}__gte`] =
          parseAsString.withOptions(queryStateOptions);
        parsers[`${columnId}__lte`] =
          parseAsString.withOptions(queryStateOptions);
      } else if (isRange) {
        parsers[`${columnId}__gte`] =
          parseAsString.withOptions(queryStateOptions);
        parsers[`${columnId}__lte`] =
          parseAsString.withOptions(queryStateOptions);
      } else {
        parsers[columnId] = parseAsString.withOptions(queryStateOptions);
      }
    });
    return parsers;
  }, [filterableColumns, queryStateOptions]);

  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filterValues) => {
      void setPage(1);
      void setFilterValues(values);
    },
    debounceMs
  );

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    const filters: ColumnFiltersState = [];
    filterableColumns.forEach((column) => {
      const columnId = column.id ?? '';
      const variant = column.meta?.variant;
      const isDateRange = variant === 'dateRange';
      const isRange = variant === 'range';
      const hasOptions = !!column.meta?.options;

      if (isDateRange) {
        const gteValue = filterValues[`${columnId}__gte`];
        const lteValue = filterValues[`${columnId}__lte`];
        if (gteValue || lteValue) {
          const fromTimestamp = gteValue
            ? parseMiladiToTimestamp(gteValue)
            : undefined;
          const toTimestamp = lteValue
            ? parseMiladiToTimestamp(lteValue)
            : undefined;
          filters.push({
            id: columnId,
            value: {
              type: 'dateRange',
              from: fromTimestamp,
              to: toTimestamp,
              columnId: columnId,
            },
          });
        }
      } else if (isRange) {
        const gteValue = filterValues[`${columnId}__gte`];
        const lteValue = filterValues[`${columnId}__lte`];
        if (gteValue || lteValue) {
          const fromNum = gteValue ? Number(gteValue) : undefined;
          const toNum = lteValue ? Number(lteValue) : undefined;
          if (fromNum !== undefined && toNum !== undefined) {
            filters.push({
              id: columnId,
              value: [fromNum, toNum],
            });
          }
        }
      } else {
        const value = filterValues[columnId];
        if (value !== null) {
          if (hasOptions) {
            const arrayValue = Array.isArray(value) ? value : [value];
            filters.push({
              id: columnId,
              value: arrayValue,
            });
          } else {
            if (variant === 'date') {
              const timestamp = parseMiladiToTimestamp(value);
              if (timestamp) {
                filters.push({
                  id: columnId,
                  value: timestamp,
                });
              }
            } else {
              const stringValue =
                typeof value === 'string' ? value : value?.toString() ?? '';
              filters.push({
                id: columnId,
                value: stringValue,
              });
            }
          }
        }
      }
    });
    return filters;
  }, [filterValues, filterableColumns]);

  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  const onColumnFiltersChange = React.useCallback(
    (updaterOrValue: Updater<ColumnFiltersState>) => {
      setColumnFilters((prev) => {
        const next =
          typeof updaterOrValue === 'function'
            ? updaterOrValue(prev)
            : updaterOrValue;

        const filterUpdates: Record<string, string | string[] | null> = {};

        next.forEach((filter) => {
          const column = filterableColumns.find((col) => col.id === filter.id);
          if (!column) return;

          const variant = column.meta?.variant;
          const isDateRange = variant === 'dateRange';
          const isRange = variant === 'range';
          const isDate = variant === 'date';
          const hasOptions = !!column.meta?.options;

          if (isDateRange) {
            if (
              filter.value &&
              typeof filter.value === 'object' &&
              'type' in filter.value &&
              filter.value.type === 'dateRange'
            ) {
              const dateRangeValue = filter.value as {
                type: 'dateRange';
                from?: number;
                to?: number;
                columnId: string;
              };
              if (dateRangeValue.from) {
                filterUpdates[`${filter.id}__gte`] = timestampToMiladi(
                  dateRangeValue.from
                );
              } else {
                filterUpdates[`${filter.id}__gte`] = null;
              }

              if (dateRangeValue.to) {
                filterUpdates[`${filter.id}__lte`] = timestampToMiladi(
                  dateRangeValue.to
                );
              } else {
                filterUpdates[`${filter.id}__lte`] = null;
              }
            } else {
              filterUpdates[`${filter.id}__gte`] = null;
              filterUpdates[`${filter.id}__lte`] = null;
            }
          } else if (isRange) {
            if (Array.isArray(filter.value) && filter.value.length === 2) {
              const [fromValue, toValue] = filter.value as [number, number];
              filterUpdates[`${filter.id}__gte`] = String(fromValue);
              filterUpdates[`${filter.id}__lte`] = String(toValue);
            } else {
              filterUpdates[`${filter.id}__gte`] = null;
              filterUpdates[`${filter.id}__lte`] = null;
            }
          } else if (isDate) {
            if (typeof filter.value === 'number') {
              filterUpdates[filter.id] = timestampToMiladi(filter.value);
            } else {
              filterUpdates[filter.id] = null;
            }
          } else if (hasOptions) {
            if (Array.isArray(filter.value)) {
              filterUpdates[filter.id] = filter.value;
            } else {
              filterUpdates[filter.id] = null;
            }
          } else {
            if (typeof filter.value === 'string') {
              filterUpdates[filter.id] = filter.value;
            } else {
              filterUpdates[filter.id] = null;
            }
          }
        });

        prev.forEach((prevFilter) => {
          const stillExists = next.some(
            (filter) => filter.id === prevFilter.id
          );
          if (!stillExists) {
            const column = filterableColumns.find(
              (col) => col.id === prevFilter.id
            );
            const variant = column?.meta?.variant;

            if (variant === 'dateRange') {
              filterUpdates[`${prevFilter.id}__gte`] = null;
              filterUpdates[`${prevFilter.id}__lte`] = null;
            } else if (variant === 'range') {
              filterUpdates[`${prevFilter.id}__gte`] = null;
              filterUpdates[`${prevFilter.id}__lte`] = null;
            } else {
              filterUpdates[prevFilter.id] = null;
            }
          }
        });

        debouncedSetFilterValues(filterUpdates);
        return next;
      });
    },
    [debouncedSetFilterValues, filterableColumns]
  );

  const tableColumns = useTableColumns(columns, {
    enableExpand,
    enableSelection: enableRowSelection,
    actions,
  });

  const table = useReactTable({
    ...tableProps,
    columns: tableColumns,
    initialState,
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
    shallow,
    rowSelection,
    debounceMs,
  };
}
