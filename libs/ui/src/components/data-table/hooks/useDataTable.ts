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
import {
  type Parser,
  type UseQueryStateOptions,
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
  useQueryStates,
} from 'nuqs';
import * as React from 'react';
import { FilterChips, UseTableProps } from '../types';
import { useTableColumns } from '../columns';

const PAGE_KEY = 'page';
const PER_PAGE_KEY = 'page_size';
const ARRAY_SEPARATOR = ',';

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

  const queryStateOptions = React.useMemo<
    Omit<UseQueryStateOptions<string>, 'parse'>
  >(
    () => ({
      history,
      shallow,
      clearOnDefault,
    }),
    [history, shallow, clearOnDefault]
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
    return filterableColumns.reduce<
      Record<string, Parser<string> | Parser<string[]>>
    >((acc, column) => {
      const variant = column.meta?.variant;
      if (variant === 'multiSelect') {
        acc[column.id!] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR
        ).withOptions(queryStateOptions);
      } else {
        // everything else (text, number, select) → string parser
        acc[column.id!] = parseAsString.withOptions(queryStateOptions);
      }
      return acc;
    }, {});
  }, [filterableColumns, queryStateOptions]);

  // Get filter values from URL
  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  const initialColumnFilters: ColumnFiltersState = React.useMemo(() => {
    return Object.entries(filterValues).reduce<ColumnFiltersState>(
      (filters, [key, value]) => {
        if (value !== null) {
          const processedValue = Array.isArray(value)
            ? value
            : typeof value === 'string' && /[^a-zA-Z0-9]/.test(value)
            ? value.split(/[^ء-یa-zA-Z0-9]+/).filter(Boolean)
            : [value];

          filters.push({
            id: key,
            value: processedValue,
          });
        }
        return filters;
      },
      []
    );
  }, [filterValues]);

  // Keep track of pending filters (before submit)
  const [columnFilters, setColumnFilters] =
    React.useState<ColumnFiltersState>(initialColumnFilters);

  // Track active filter chips for display
  const [activeFilterChips, setActiveFilterChips] = React.useState<FilterChips>(
    initialColumnFilters.map((filter) => ({
      key: filter.id,
      label:
        columns.find((col) => col.id === filter.id)?.meta?.label || filter.id,
      value: filter.value,
    }))
  );

  // Handle column filter changes (this happens as user types/selects)
  const onColumnFiltersChange = React.useCallback(
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

  // Submit filters - update URL and trigger refetch
  const submitFilters = React.useCallback(() => {
    const filterUpdates = columnFilters.reduce<
      Record<string, string | string[] | null>
    >((acc, filter) => {
      if (filterableColumns.find((column) => column.id === filter.id)) {
        acc[filter.id] = filter.value as string | string[];
      }
      return acc;
    }, {});

    // Clear any filters that were removed
    filterableColumns.forEach((column) => {
      if (!columnFilters.some((filter) => filter.id === column.id)) {
        filterUpdates[column.id ?? ''] = null;
      }
    });

    // Update URL params
    void setFilterValues(filterUpdates);
    void setPage(null);

    // Update filter chips for display
    const chips = columnFilters.map((filter) => {
      const col = columns.find((col) => col.id === filter.id);
      const label = col?.meta?.label || filter.id;
      const options = col?.meta?.options as
        | { label: string; value: string }[]
        | undefined;

      let value = filter.value;

      if (options) {
        if (Array.isArray(filter.value)) {
          value = filter.value
            .map(
              (val) => options.find((opt) => opt.value === val)?.label || val
            )
            .join(', ');
        } else {
          value =
            options.find((opt) => opt.value === filter.value)?.label ||
            filter.value;
        }
      }

      return {
        key: filter.id,
        label,
        value,
      };
    });

    setActiveFilterChips(chips);
  }, [columnFilters, filterableColumns, columns, setFilterValues, setPage]);

  // Remove a single filter (by chip click)
  const removeFilter = React.useCallback(
    (filterId: string) => {
      // Update table state
      const newFilters = columnFilters.filter((f) => f.id !== filterId);
      setColumnFilters(newFilters);

      // Update URL immediately
      const filterUpdates = { [filterId]: null };
      void setFilterValues(filterUpdates);

      // Update chips
      const newChips = activeFilterChips.filter(
        (chip) => chip.key !== filterId
      );
      setActiveFilterChips(newChips);
    },
    [columnFilters, activeFilterChips, setFilterValues]
  );

  // Reset all filters
  const resetFilters = React.useCallback(() => {
    // Clear table's filter state
    setColumnFilters([]);

    // Clear all URL params for filters
    const resetValues = Object.keys(filterValues).reduce<Record<string, null>>(
      (acc, key) => {
        acc[key] = null;
        return acc;
      },
      {}
    );
    void setFilterValues(resetValues);

    // Clear chips
    setActiveFilterChips([]);
  }, [filterValues, setFilterValues]);

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
      columnFilters: initialColumnFilters,
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
    submitFilters,
    resetFilters,
    removeFilter,
    activeFilterChips,
    filterCount: activeFilterChips.length,
    rowSelection,
  };
}
