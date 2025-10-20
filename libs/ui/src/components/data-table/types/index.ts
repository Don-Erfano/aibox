import type {
  Column,
  ColumnDef,
  ColumnSort,
  Row,
  RowData,
  Table,
  Table as TanstackTable,
  TableOptions,
  TableState,
} from '@tanstack/react-table';
import { FilterItemSchema } from '../lib/parsers';
import { DataTableConfig } from '../constant';
import { Options } from 'nuqs';
import type { DateRange } from 'react-day-picker';
import { ComponentProps } from 'react';

export interface UseTableFiltersProps<TData> {
  table: Table<TData>;
  columns: ColumnDef<TData, any>[];
  history?: 'push' | 'replace';
  clearOnDefault?: boolean;
  shallow?: boolean;
  setPage: (
    value: number | ((old: number) => number | null) | null,
    options?: Options
  ) => Promise<URLSearchParams>;
}

export interface FilterChipsBarProps {
  onRemove: (key: string) => void;
  chipCount: number;
}

export interface TablePaginationProps<TData> extends ComponentProps<'div'> {
  table: Table<TData>;
  pageSizeOptions?: number[];
}

export interface ArrayCellProps {
  items?: Array<string | number>;
  maxVisible?: number;
}

export interface TableRowField<T> {
  label: string;
  key: keyof T;
}

export interface TableRowDetailsProps<T> {
  data: T;
  fields: TableRowField<T>[];
}

export enum EFilterTableNameIcon {
  FILTER = 'filter',
  SEARCH = 'search',
}

export type OnHandleIconClick = (name: EFilterTableNameIcon) => void;

export type FilterChipsProps = {
  onHandleIconClick: OnHandleIconClick;
  handleFiltersChips?: (key: unknown) => void;
  removeFilter: (key: string) => void;
  filterCount: number;
};

export interface UseTableFiltersReturn {
  submitFilters: () => void;
  resetFilters: () => void;
  removeFilter: (filterId: string) => void;
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
  actions?: actionsProps<TData>;
  debounceMs?: number;
}

export interface TableViewOptionsProps<TData> {
  table: Table<TData>;
}

export type CustomAction<T> = {
  icon: React.ReactElement | ((row: T) => React.ReactElement | null);
  label: string | ((row: T) => string);
  onClick: (row: T) => void;
  disabled?: boolean;
  hidden?: (row: T) => boolean;
};

export type actionsProps<T> = {
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActions?: CustomAction<T>[];
};

export interface DataTableProps<TData> extends ComponentProps<'div'> {
  table: TanstackTable<TData>;
  actionBar?: React.ReactNode;
  childComponent?: React.ComponentType<{ row: TData }>;
}

export interface TableToolbarProps<TData> {
  table: Table<TData>;
  totalItems: number;
  title: string;
  searchPlaceholder?: string;
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
    mobileVisible?: boolean;
    range?: [number, number];
    unit?: string;
    showSlider?: boolean;
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

export const ToolbarButton = {
  FILTER: 'filter',
  REFRESH: 'refresh',
  COLUMNS: 'columns',
  CHART: 'chart',
  TABLE: 'table',
} as const;

export type ToolbarButtonType =
  (typeof ToolbarButton)[keyof typeof ToolbarButton];

export type ViewModeButton = Extract<ToolbarButtonType, 'chart' | 'table'>;
export type ChipButton = Extract<ToolbarButtonType, 'filter' | 'columns'>;
export type ActionButton = Extract<
  ToolbarButtonType,
  'filter' | 'columns' | 'refresh'
>;

export type FilterEnabledProps = {
  noFilter?: false;
  filterCount: number;
  submitFilters: () => void;
  resetFilters: () => void;
};

export type FilterProps =
  | {
      noFilter?: false;
      filterCount: number;
      submitFilters: () => void;
      resetFilters: () => void;
    }
  | {
      noFilter: true;
    };

export type ManageColumnsProps =
  | {
      noManageColumns?: false;
      reorderedColumnCount: number;
    }
  | {
      noManageColumns: true;
    };

export interface TableDateFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
  multiple?: boolean;
}

export type DateSelection = Date[] | DateRange;

export interface FilterFormProps<TData> {
  onSubmit: () => void;
  columns: Column<TData>[];
  open: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onClose?: () => void;
}

export interface TableFiltersFormProps<TData> {
  column: Column<TData>;
}

export type ToolbarButtonProps = ComponentProps<'button'>;

export interface DataTableFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  options: Option[];
  multiple?: boolean;
}
