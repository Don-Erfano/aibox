'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar } from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';

const UserList: FC = () => {
  const { users, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetUserList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => console.log(`${row.first_name} ${row.last_name}`),
      onDelete: (row) => console.log(row.id),
    },
  });

  return (
    <div className="w-full shadow-2xl px-11 py-5 rounded-sm">
      <TableToolbar
        title="کاربران"
        totalItems={totalItems}
        table={table}
        refreshLoading={isLoading || isFetching}
        refetch={refetch}
        submitFilters={submitFilters}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />

      <DataTable table={table} />
    </div>
  );
};

export default UserList;
