import type {
  Table as TanstackTable,
  Column,
  useReactTable,
  ColumnFiltersState,
  TableOptions,
  TableState,
  ColumnSort,
  Table,
  Header,
} from '@tanstack/react-table';
import type { Row, RowData } from '@tanstack/react-table';
import { FilterItemSchema } from '../lib/parsers';
import { Dispatch, SetStateAction } from 'react';
import { DataTableConfig } from '../constant';

export interface FilterChipsBarProps {
  chips: FilterChips;
  onRemove: (key: string) => void;
  chipCount: number;
}

export interface TablePaginationProps<TData>
  extends React.ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export interface ArrayCellProps {
  items?: Array<string | number>;
  maxVisible?: number;
}

export enum EFilterTableNameIcon {
  FILTER = 'filter',
  SEARCH = 'search',
}

export type OnHandleIconClick = (name: EFilterTableNameIcon) => void;

export type FilterChips = Array<{
  key: string;
  label: string;
  value: unknown;
}>;

export type FilterChipsProps = {
  onHandleIconClick: OnHandleIconClick;
  handleFiltersChips?: (key: unknown) => void;
  removeFilter: (key: string) => void;
  activeFilterChips: FilterChips;
  filterCount: number;
};

export interface UseTableReturn<TData> {
  table: ReturnType<typeof useReactTable<TData>>;
  pendingFilters: ColumnFiltersState;
  submitFilters: () => void;
  resetFilters: () => void;
  removeFilter: (id: string) => void;
  updatePendingFilter: (columnId: string, value: unknown) => void;
  shallow: boolean;
}

export interface TableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  refreshLoading: boolean;
  collapse?: boolean;
  setCollapse?: Dispatch<SetStateAction<boolean>>;
  onSearchClick?: () => void;
  tableName?: string;
  search: boolean;
  setSearch: Dispatch<SetStateAction<boolean>>;
  chipNumber?: number;
  showSearchIcon?: boolean;
  submitFilters: () => void;
  resetFilters: () => void;
  removeFilter: (key: string) => void;
  activeFilterChips: FilterChips;
  filterCount: number;
}

export interface ExtendedColumnSort<TData> extends Omit<ColumnSort, 'id'> {
  id: Extract<keyof TData, string>;
}

export interface UseTableProps<TData>
  extends Omit<
      TableOptions<TData>,
      | 'state'
      | 'pageCount'
      | 'getCoreRowModel'
      | 'manualFiltering'
      | 'manualPagination'
      | 'manualSorting'
      | 'enableRowSelection'
    >,
    Required<Pick<TableOptions<TData>, 'pageCount'>> {
  initialState?: Omit<Partial<TableState>, 'sorting'> & {
    sorting?: ExtendedColumnSort<TData>[];
  };
  enableRowSelection?: boolean;
  history?: 'push' | 'replace';
  clearOnDefault?: boolean;
  enableExpand?: boolean;
  shallow?: boolean;
  actions: actionsProps<TData>;
}

export interface TableViewOptionsProps<TData> {
  table: Table<TData>;
}

export interface TableFiltersFormProps<TData> {
  column: Column<TData>;
}

export type CustomAction<T> = {
  icon: React.ReactElement;
  label: string;
  onClick: (row: T) => void;
};

export type actionsProps<T> = {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActions?: CustomAction<T>[];
};

export interface DataTableProps<TData> extends React.ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  childComponent?: React.ComponentType<{ row: TData }>;
}

export type SortParams = { sortBy: `${string}.${'asc' | 'desc'}` };

export type FilterVariant = DataTableConfig['filterVariants'][number];

declare module '@tanstack/react-table' {
  // biome-ignore lint/correctness/noUnusedVariables: <explanation>
  interface ColumnMeta<TData extends RowData, TValue> {
    variant?: FilterVariant;
    label: string;
    placeholder?: string;
    options?: Option[];
    icon?: React.ReactNode;
  }
}

export interface Option {
  label: string;
  value: string;
  count?: number;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ExtendedColumnFilter<TData> extends FilterItemSchema {
  id: Extract<keyof TData, string>;
}

export interface DataTableRowAction<TData> {
  row: Row<TData>;
  variant: 'update' | 'delete';
}

export interface TableActionBarSelectionProps<TData> {
  table: Table<TData>;
}
