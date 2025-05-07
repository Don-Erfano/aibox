import * as React from 'react';
import {
  FilterChips,
  UseTableFiltersProps,
  UseTableFiltersReturn,
} from '../types';
import { parseAsArrayOf, parseAsString, Parser, useQueryStates } from 'nuqs';

export function useTableFilters<TData>({
  table,
  columns,
  history = 'replace',
  clearOnDefault = false,
  shallow = true,
  setPage,
}: UseTableFiltersProps<TData>): UseTableFiltersReturn {
  const ARRAY_SEPARATOR = ',';

  const queryStateOptions = React.useMemo(
    () => ({
      history,
      shallow,
      clearOnDefault,
    }),
    [history, shallow, clearOnDefault]
  );

  const filterableColumns = React.useMemo(() => {
    return columns.filter((column) => column.enableColumnFilter);
  }, [columns]);

  const filterParsers = React.useMemo(() => {
    return filterableColumns.reduce<
      Record<string, Parser<string> | Parser<string[]>>
    >((acc, column) => {
      if (column.meta?.options) {
        acc[column.id ?? ''] = parseAsArrayOf(
          parseAsString,
          ARRAY_SEPARATOR
        ).withOptions(queryStateOptions);
      } else {
        acc[column.id ?? ''] = parseAsString.withOptions(queryStateOptions);
      }
      return acc;
    }, {});
  }, [filterableColumns, queryStateOptions]);

  // Get filter values from URL
  const [filterValues, setFilterValues] = useQueryStates(filterParsers);

  // Track active filter chips for display
  const [activeFilterChips, setActiveFilterChips] = React.useState<FilterChips>(
    table.getState().columnFilters.map((filter) => ({
      key: filter.id,
      label:
        columns.find((col) => col.id === filter.id)?.meta?.label || filter.id,
      value: filter.value,
    }))
  );

  // Submit filters - update URL and trigger refetch
  const submitFilters = React.useCallback(() => {
    const columnFilters = table.getState().columnFilters;

    const filterUpdates = columnFilters.reduce((acc, filter) => {
      if (filterableColumns.find((column) => column.id === filter.id)) {
        acc[filter.id] = filter.value as string | string[];
      }
      return acc;
    }, {} as Record<string, string | string[] | null>);

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
    const chips = columnFilters.map((filter) => ({
      key: filter.id,
      label:
        columns.find((col) => col.id === filter.id)?.meta?.label || filter.id,
      value: filter.value,
    }));

    setActiveFilterChips(chips);
  }, [table, columns, filterableColumns, setFilterValues, setPage]);

  // Remove a single filter (by chip click)
  const removeFilter = React.useCallback(
    (filterId: string) => {
      // Update table state
      table.getColumn(filterId)?.setFilterValue(null);

      // Update URL immediately
      const filterUpdates = { [filterId]: null };
      void setFilterValues(filterUpdates);

      const newChips = activeFilterChips.filter(
        (chip) => chip.key !== filterId
      );
      setActiveFilterChips(newChips);
    },
    [activeFilterChips, table, setFilterValues]
  );

  const resetFilters = React.useCallback(() => {
    table.resetColumnFilters();

    const resetValues = Object.keys(filterValues).reduce<Record<string, null>>(
      (acc, key) => {
        acc[key] = null;
        return acc;
      },
      {}
    );
    void setFilterValues(resetValues);

    setActiveFilterChips([]);
  }, [table, filterValues, setFilterValues]);

  return {
    submitFilters,
    resetFilters,
    removeFilter,
    activeFilterChips,
    filterCount: activeFilterChips.length,
  };
}
