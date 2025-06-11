'use client';

import clsx from 'clsx';
import {
  Funnel as FilterIcon,
  LoaderCircle as LoadingIcon,
  Columns3 as ManageColumnIcon,
  RotateCw as RefreshIcon,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useEffect, useMemo, useState } from 'react';

import { useDebouncedCallback } from '../../../hooks';
import { Button } from '../../form';
import { CustomChip } from '../../custom-chip';
import { SearchBar } from '../../search-bar';
import { viewModeList } from '../constant';
import {
  ActionButton,
  ChipButton,
  TableToolbarProps,
  ToolbarButtonProps,
  ToolbarButtonType,
  ViewModeButton,
} from '../types';
import { FilterForm } from './filter-form';

const ToolbarButton = (props: ToolbarButtonProps) => (
  <Button variant="ghost" size="icon" className="text-zinc-700" {...props} />
);

export const TableToolbar = <TData,>(props: TableToolbarProps<TData>) => {
  const {
    title,
    totalItems,
    table,
    refreshLoading,
    viewModeButtons = false,
    noFilter,
    noManageColumns,
    refetch,
  } = props;

  const [activeAction, setActiveAction] = useState<ActionButton | null>(null);
  const [activeMode, setActiveMode] = useState<ViewModeButton>('table');
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const [search, setSearch] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_searchParam, setSearchParam] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
  });

  const columns = useMemo(
    () => table.getAllColumns().filter((col) => col.getCanFilter()),
    [table]
  );

  const onSearchValueChange = useDebouncedCallback(() => {
    setSearchParam(search);
  }, 500);

  useEffect(() => {
    onSearchValueChange();
  }, [search, onSearchValueChange]);

  const isFilterActive = activeAction === 'filter';

  const handleActionClick = async (name: ToolbarButtonType) => {
    if (activeAction === name) return setActiveAction(null);

    const actions: Partial<Record<ToolbarButtonType, () => void>> = {
      filter: () => {
        setActiveAction(name as ActionButton);
        if (window.innerWidth < 1024) setOpenFilterModal(true);
      },
      columns: () => {
        setActiveAction(name as ActionButton);
      },
      refresh: () => refetch(),
      table: () => setActiveMode(name as ViewModeButton),
      chart: () => setActiveMode(name as ViewModeButton),
    };

    actions[name]?.();
  };

  const handleChipClick = (name: ChipButton) => {
    const chipActions: Partial<Record<ChipButton, () => void>> = {
      filter: () => !noFilter && props.resetFilters(),
    };

    chipActions[name]?.();
  };

  const onFormSubmit = () => {
    if (!noFilter) {
      props.submitFilters();
      setOpenFilterModal(false);
      setActiveAction(null);
    }
  };

  return (
    <div
      className={clsx('w-full py-1 sm:px-5', {
        'lg:border lg:border-gray-100 lg:rounded-md lg:bg-neutral-50':
          isFilterActive,
      })}
    >
      <div className="relative w-full h-40 sm:h-28 lg:h-12">
        <div className="absolute right-0 top-3 flex items-center gap-2">
          <span className="text-sm font-medium text-slate-950">{title}</span>
          <span className="size-6 flex items-center justify-center rounded-full bg-slate-950 text-sm font-medium text-white">
            {totalItems < 100 ? totalItems : '99+'}
          </span>
        </div>
        <div
          className={clsx('absolute top-1 left-0', {
            hidden: !viewModeButtons,
          })}
        >
          <div className="flex gap-2">
            {viewModeList.map(({ icon, name }) => (
              <ToolbarButton
                key={name}
                onClick={() => handleActionClick(name)}
                aria-selected={activeMode === name}
              >
                {icon}
              </ToolbarButton>
            ))}
          </div>
        </div>
        <div
          className={clsx(
            'absolute left-0 lg:left-[114px] top-15 lg:top-1 h-10 w-full lg:w-fit',
            {
              'left-0 top-15 lg:!left-0 lg:top-1': !viewModeButtons,
            }
          )}
        >
          <div className="flex items-end flex-col sm:flex-row sm:items-center justify-end lg:justify-start gap-2">
            <div className="w-full lg:w-[300px]">
              <SearchBar
                value={search}
                onValueChange={setSearch}
                loading={refreshLoading}
              />
            </div>
            <div className="flex justify-center items-center gap-2">
              {!noFilter && !!props.filterCount && (
                <CustomChip
                  label={props.filterCount}
                  onIconClick={() => handleChipClick('filter')}
                />
              )}
              {!noFilter && (
                <ToolbarButton
                  onClick={() => handleActionClick('filter')}
                  aria-selected={activeAction === 'filter'}
                  data-activated={!!props.filterCount}
                >
                  <FilterIcon />
                </ToolbarButton>
              )}
              {!noManageColumns && !!props.reorderedColumnCount && (
                <CustomChip
                  label={props.reorderedColumnCount}
                  onIconClick={() => handleChipClick('columns')}
                />
              )}
              {!noManageColumns && (
                <ToolbarButton
                  onClick={() => handleActionClick('columns')}
                  aria-selected={activeAction === 'columns'}
                  data-activated={!!props.reorderedColumnCount}
                >
                  <ManageColumnIcon />
                </ToolbarButton>
              )}
              <ToolbarButton
                onClick={() => handleActionClick('refresh')}
                disabled={refreshLoading}
              >
                {refreshLoading ? (
                  <LoadingIcon className="animate-spin" />
                ) : (
                  <RefreshIcon />
                )}
              </ToolbarButton>
            </div>
          </div>
        </div>

        <div
          className={clsx(
            'absolute top-13 w-full h-[1px] lg:!w-[1px] lg:h-10 lg:top-1 lg:left-[100px] bg-teal-600',
            { 'lg:hidden': !viewModeButtons }
          )}
        />
      </div>

      {isFilterActive && (
        <FilterForm
          open={openFilterModal}
          onOpenChange={setOpenFilterModal}
          onClose={() => setActiveAction(null)}
          columns={columns}
          onSubmit={onFormSubmit}
        />
      )}
    </div>
  );
};
