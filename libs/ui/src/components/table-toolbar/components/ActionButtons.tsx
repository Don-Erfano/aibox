import {
  Funnel as FilterIcon,
  LoaderCircle as LoadingIcon,
  Columns3 as ManageColumnIcon,
  RotateCw as RefreshIcon,
} from 'lucide-react';
import { useQueryState } from 'nuqs';
import { useState } from 'react';

import { SearchBar } from '../../SearchBar';
import { useIsLargeView } from '../hooks';
import { ActionButtonsProps, EActionButton } from '../types';
import FilterIconButton from './FilterIconButton';

export const ActionButtons = (props: ActionButtonsProps) => {
  const {
    activeIcon,
    hideActions,
    isLoading,
    onActionButtonClick,
    onCloseChipClick,
    filterCount,
  } = props;

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useQueryState('search', {
    clearOnDefault: true,
    defaultValue: '',
    shallow: false,
    throttleMs: 700,
  });

  const isLargeView = useIsLargeView();

  const isHide = (name: EActionButton) => hideActions?.includes(name);

  return (
    <div className="flex items-center justify-end lg:justify-start gap-5">
      <div className="w-full lg:w-[300px]">
        <SearchBar
          value={search ?? ''}
          onValueChange={(value) => setSearch(value ?? null)}
          open={open}
          toggleOpen={setOpen}
        />
      </div>
      {(isLargeView || !open) && (
        <>
          {!isHide(EActionButton.FILTER) && (
            <FilterIconButton
              icon={<FilterIcon />}
              isActive={activeIcon === EActionButton.FILTER}
              onClick={() => onActionButtonClick(EActionButton.FILTER)}
              hasChip={true}
              chipLabel={filterCount || 0}
              onChipClick={() => onCloseChipClick(EActionButton.FILTER)}
            />
          )}

          {!isHide(EActionButton.COLUMNS) && (
            <FilterIconButton
              icon={<ManageColumnIcon />}
              isActive={activeIcon === EActionButton.COLUMNS}
              onClick={() => onActionButtonClick(EActionButton.COLUMNS)}
              hasChip={true}
              chipLabel={0}
              disabled={true}
              onChipClick={() => onCloseChipClick(EActionButton.COLUMNS)}
            />
          )}

          <FilterIconButton
            icon={
              isLoading ? (
                <LoadingIcon className="animate-spin" />
              ) : (
                <RefreshIcon />
              )
            }
            isActive={activeIcon === EActionButton.REFRESH}
            onClick={() => onActionButtonClick(EActionButton.REFRESH)}
            hasChip={false}
            disabled={isLoading}
          />
        </>
      )}
    </div>
  );
};
