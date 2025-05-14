'use client';

import clsx from 'clsx';
import {
  Funnel as FilterIcon,
  LoaderCircle as LoadingIcon,
  Columns3 as ManageColumnIcon,
  RotateCw as RefreshIcon,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

import { SearchBar } from '../../search-bar';
import { Button } from '../../button';
import { viewModeList } from '../constant';
import { useIsLargeView } from '../hooks';
import {
  ActionButton,
  ChipButton,
  TableToolbarProps,
  ToolbarButtonProps,
  ToolbarButtonType,
  ViewModeButton,
} from '../types';
import { FilterForm } from './filter-form';
import { CustomChip } from '../../custom-chip';

const ToolbarButton = (props: ToolbarButtonProps) => (
  <Button variant="secondary" size="icon" {...props} />
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
  const [openSearchbar, setOpenSearchbar] = useState(false);
  const [search, setSearch] = useQueryState('search', {
    defaultValue: '',
    clearOnDefault: true,
    throttleMs: 700,
    shallow: false,
  });

  const columns = useMemo(
    () => table.getAllColumns().filter((col) => col.getCanFilter()),
    [table]
  );
  const isLargeView = useIsLargeView();

  const isFilterActive = activeAction === 'filter';

  const handleActionClick = async (name: ToolbarButtonType) => {
    if (activeAction === name) return setActiveAction(null);

    const actions: Partial<Record<ToolbarButtonType, () => void>> = {
      filter: () => {
        setActiveAction(name as ActionButton);
        setOpenFilterModal(true);
      },
      columns: () => {
        setActiveAction(name as ActionButton);
      },
      refresh: async () => {
        setActiveAction(name as ActionButton);
        await refetch();
        setActiveAction(null);
      },
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
      className={clsx('w-full p-2', {
        'border border-gray-100 rounded-md bg-neutral-50': isFilterActive,
      })}
    >
      <div className="relative w-full h-[104px] lg:h-12">
        <div className="absolute right-0 top-3 flex items-center gap-2 leading-h6">
          <span className="text-h5 font-medium text-slate-950">{title}</span>
          <span className="flex size-7 items-center justify-center rounded-full bg-slate-950 text-h5 font-medium text-white">
            {totalItems < 100 ? totalItems : '+99'}
          </span>
        </div>
        <div
          className={clsx('absolute top-1 left-0', {
            hidden: !viewModeButtons,
          })}
        >
          <div className="flex gap-5">
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
            'absolute left-0 lg:left-32 top-15 lg:top-1 h-10 w-full lg:w-fit',
            {
              'left-0 top-15 lg:!left-0 lg:top-1': !viewModeButtons,
            }
          )}
        >
          <div className="flex items-center justify-end lg:justify-start gap-5">
            <div className="w-full lg:w-[300px]">
              <SearchBar
                value={search}
                onValueChange={(value) => setSearch(value)}
                open={openSearchbar}
                toggleOpen={setOpenSearchbar}
              />
            </div>
            {(isLargeView || !openSearchbar) && (
              <>
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
                  aria-selected={activeAction === 'refresh'}
                  disabled={refreshLoading}
                >
                  {refreshLoading ? <LoadingIcon /> : <RefreshIcon />}
                </ToolbarButton>
              </>
            )}
          </div>
        </div>

        <div
          className={clsx(
            'absolute top-13 w-full h-[1px] lg:!w-[1px] lg:h-10 lg:top-1 lg:left-28 bg-teal-600',
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
