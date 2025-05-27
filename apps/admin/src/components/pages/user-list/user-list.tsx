'use client';

import { FC } from 'react';
import {
  useDataTable,
  DataTable,
  TableToolbar,
  GenericActionBar,
} from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';

const UserList: FC = () => {
  const { users, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetUserList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: totalPages,
    enableExpand: true,
    enableRowSelection: true,
    actions: {
      onEdit: (row) => console.log(`${row.first_name} ${row.last_name}`),
      onDelete: (row) => console.log(row.id),
    },
  });

  return (
    <div className="w-full h-full shadow-2xl px-11 py-5 rounded-sm">
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

      <DataTable
        table={table}
        isLoading={isLoading}
        actionBar={
          <GenericActionBar
            table={table}
            onDelete={(id) => {
              console.log('Deleting:', id);
              return Promise.resolve();
            }}
            onEdit={(ids) => {
              console.log('Editing:', ids);
            }}
          />
        }
      />
    </div>
  );
};

export default UserList;
