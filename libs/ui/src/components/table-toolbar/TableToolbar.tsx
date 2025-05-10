'use client';
import clsx from 'clsx';
import { useMemo, useState } from 'react';

import { Modal } from '../Modal';
import {
  ActionButtons,
  FilterForm,
  TableInfoWrapper,
  ViewModeButtons,
} from './components';
import { useIsLargeView } from './hooks';
import { EActionButton, EViewModeButton, TableToolbarProps } from './types';

export const TableToolbar = <TData,>(props: TableToolbarProps<TData>) => {
  const {
    title,
    totalItems,
    hideActiveButtons = false,
    table,
    hideActions = [],
    submitFilters,
    resetFilters,
    filterCount,
    queryKey,
    refreshLoading,
  } = props;

  const [activeIcon, setActiveIcon] = useState<EActionButton | null>(null);
  const [activeMode, setActiveMode] = useState<EViewModeButton>(
    EViewModeButton.TABLE
  );
  const [openFilterModal, setOpenFilterModal] = useState(false);

  // This code must be uncommented after adding the React Query package.
  // const queryClient = useQueryClient();

  const columns = useMemo(
    () => table.getAllColumns().filter((col) => col.getCanFilter()),
    [table]
  );

  const isLargeView = useIsLargeView();

  const isFilterActive = activeIcon === EActionButton.FILTER;

  const handleActionClick = async (name: EActionButton) => {
    const isSame = activeIcon === name;

    if (isSame) {
      setActiveIcon(null);
      return;
    }

    const actions: Partial<Record<EActionButton, () => void>> = {
      [EActionButton.FILTER]: () => {
        setActiveIcon(name);
        setOpenFilterModal(!isLargeView);
      },
      [EActionButton.REFRESH]: () => {
        setActiveIcon(name);
        // queryClient.invalidateQueries(queryKey);
      },
      // [EActionButton.COLUMNS]: () => {
      //   setActiveIcon(name);
      //   // setColumnModalOpen(true);
      // },
    };

    actions[name]?.();
  };

  const handleChipClick = (name: EActionButton) => {
    const chipActions: Partial<Record<EActionButton, () => void>> = {
      [EActionButton.FILTER]: () => {
        resetFilters();
      },
      // [EActionButton.COLUMNS]: () => {},
    };

    chipActions[name]?.();
  };

  const onFormSubmit = () => {
    submitFilters();
    setOpenFilterModal(false);
    setActiveIcon(null);
  };

  const renderFilterSection = () => {
    if (!isFilterActive) return null;
    return isLargeView ? (
      <FilterForm columns={columns} onSubmit={onFormSubmit} />
    ) : (
      <Modal
        open={openFilterModal}
        onOpenChange={setOpenFilterModal}
        title="فرم فیلتر"
        onClose={() => setActiveIcon(null)}
      >
        <FilterForm columns={columns} onSubmit={onFormSubmit} />
      </Modal>
    );
  };

  return (
    <div
      className={clsx('w-full p-2', {
        'border border-gray-100 rounded-md bg-neutral-50': isFilterActive,
      })}
    >
      {/* Desktop View */}
      <div className="hidden lg:flex lg:justify-between lg:items-center">
        <TableInfoWrapper title={title} totalItems={totalItems} />
        <div className="flex [&>div]:first:pr-0 [&>div]:last:pl-0 [&>div]:px-3 divide-x  divide-teal-600">
          <ActionButtons
            filterCount={filterCount}
            activeIcon={activeIcon}
            onActionButtonClick={handleActionClick}
            onCloseChipClick={(name) => handleChipClick(name)}
            isLoading={refreshLoading}
            hideActions={hideActions}
          />
          {!hideActiveButtons && (
            <ViewModeButtons
              activeMode={activeMode}
              onButtonClick={(name) => setActiveMode(name)}
            />
          )}
        </div>
      </div>

      {/* Mobile View */}
      <div
        className="grid grid-rows-2 [&>div]:first:pt-0 [&>div]:last:pb-0 [&>div]:py-2 divide-y divide-teal-600 
          lg:hidden"
      >
        <div className="flex justify-between">
          <TableInfoWrapper title={title} totalItems={totalItems} />
          {!hideActiveButtons && (
            <ViewModeButtons
              activeMode={activeMode}
              onButtonClick={(name) => setActiveMode(name)}
            />
          )}
        </div>
        <ActionButtons
          filterCount={filterCount}
          activeIcon={activeIcon}
          onActionButtonClick={handleActionClick}
          onCloseChipClick={(name) => handleChipClick(name)}
          isLoading={refreshLoading}
          hideActions={hideActions}
        />
      </div>

      {/* Filter Section */}
      {renderFilterSection()}
    </div>
  );
};
