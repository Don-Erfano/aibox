import { Column, Table } from '@tanstack/react-table';
import { ReactNode } from 'react';

export enum EViewModeButton {
  CHART = 'chart',
  TABLE = 'table',
}

export enum EActionButton {
  FILTER = 'filter',
  REFRESH = 'refresh',
  COLUMNS = 'columns',
}

export interface TableToolbarProps<TData> {
  title: string;
  totalItems: number;
  table: Table<TData>;
  hideActions?: EActionButton[];
  hideActiveButtons?: false;
  submitFilters: () => void;
  resetFilters: () => void;
  filterCount?: number;
  queryKey: string;
  refreshLoading: boolean;
}

export type ChipProps =
  | {
      hasChip: false;
    }
  | {
      hasChip: true;
      chipLabel: number;
      onChipClick: () => void;
    };

export type FilterIconButtonProps = ChipProps & {
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  disabled?: boolean;
};

export interface ViewModeButtonsProps {
  activeMode: EViewModeButton;
  onButtonClick: (name: EViewModeButton) => void;
}

export interface ActionButtonsProps {
  activeIcon: EActionButton | null;
  hideActions?: EActionButton[];
  isLoading?: boolean;
  filterCount?: number;
  onActionButtonClick: (name: EActionButton) => void;
  onCloseChipClick: (name: EActionButton) => void;
}

export interface TableInfoWrapperProps {
  title: string;
  totalItems: number;
}

export interface FilterFormProps<TData> {
  onSubmit: () => void;
  columns: Column<TData>[];
}

export interface FilterIconButton<T> {
  icon: ReactNode;
  name: T;
  hasChip: boolean;
}

export interface TableFiltersFormProps<TData> {
  column: Column<TData>;
}
