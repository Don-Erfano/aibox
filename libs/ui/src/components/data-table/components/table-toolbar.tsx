'use client';
import { useMemo, useState } from 'react';

import { Button } from '../../button';
import { SearchIcon, FilterIcon, TrashIcon, Badge } from 'lucide-react';
import { FilterChipsBar } from './filter-chips-bar';
import { TableViewOptions } from './table-view-options';
import { TableFiltersForm } from './table-filters-form';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../accordion';
import { TableToolbarProps } from '../types';

export function TableToolbar<TData>({
  table,
  tableName,
  hasSearch = true,
  submitFilters,
  resetFilters,
  removeFilter,
  activeFilterChips,
  filterCount,
  totalItems = 0,
}: TableToolbarProps<TData>) {
  const [open, setOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const columns = useMemo(
    () => table.getAllColumns().filter((col) => col.getCanFilter()),
    [table]
  );

  const handleToggle = () => setOpen((prev) => !prev);
  const onSubmit = () => {
    submitFilters();
    setOpen(false);
  };
  const onCancel = () => {
    table.resetColumnFilters();
    setOpen(false);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {activeFilterChips.length > 0 && (
            <Button variant="outline" size="sm" onClick={resetFilters}>
              <TrashIcon className="w-4 h-4" />
            </Button>
          )}

          {hasSearch && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setShowSearchInput((toggleSearchInput) => !toggleSearchInput)
              }
            >
              <SearchIcon className="w-4 h-4" />
            </Button>
          )}

          {showSearchInput && <p>search component</p>}

          <Button
            variant={open ? 'default' : 'outline'}
            size="sm"
            onClick={handleToggle}
          >
            <FilterIcon className="w-4 h-4 mr-1" />
            فیلتر کردن
          </Button>

          <TableViewOptions table={table} />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-lg font-medium text-primary">{tableName}</span>
          {totalItems > 0 && <Badge>{totalItems}</Badge>}
        </div>
      </div>

      <FilterChipsBar
        chips={activeFilterChips}
        onRemove={removeFilter}
        chipCount={filterCount}
      />

      <Accordion type="single" className="border rounded">
        <AccordionItem value="filter">
          <AccordionTrigger className="bg-gray-100">فیلتر</AccordionTrigger>
          <AccordionContent className="p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {columns.map((column) => (
                <TableFiltersForm key={column.id} column={column} />
              ))}
            </div>
            <div className="flex justify-end mt-4 gap-2">
              <Button onClick={onSubmit}>ثبت</Button>
              <Button variant="outline" onClick={onCancel}>
                انصراف
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
