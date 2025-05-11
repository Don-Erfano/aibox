'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';

const UserList: FC = () => {
  const { users, totalItems, totalPages, isLoading } = useGetUserList();

  const {
    table,
    activeFilterChips,
    filterCount,
    removeFilter,
    resetFilters,
    submitFilters,
  } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => console.log(`${row.first_name} ${row.last_name}`),
      onDelete: (row) => console.log(row.id),
    },
  });

  if (isLoading) return <p>Loading…</p>;

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <div className="flex items-center mb-2 justify-center w-25">
        <h3>کاربران</h3>
        <div className="h-8 w-8 mr-2 rounded-full bg-slate-950 text-center">
          <p className="w-full text-sm mt-1.5 text-white">{totalItems}</p>
        </div>
      </div>

      <TableToolbar
        table={table}
        tableName="کاربران"
        refreshLoading={isLoading}
        totalItems={totalItems}
        submitFilters={submitFilters}
        activeFilterChips={activeFilterChips}
        filterCount={filterCount}
        removeFilter={removeFilter}
        resetFilters={resetFilters}
      />

      <DataTable table={table} />
    </div>
  );
};

export default UserList;
