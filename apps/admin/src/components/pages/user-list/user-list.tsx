'use client';

import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar, Button } from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';
import { Plus } from 'lucide-react';

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
  const handleAddUser = () => {
    console.log('clicked');
  };
  return (
    <div className="relative h-full">
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
        <Button
          onClick={handleAddUser}
          variant="ghost"
          className="absolute bottom-2 left-0 h-14 w-14 rounded-full bg-teal-600 shadow-2xl text-2xl cursor-pointer hover:bg-teal-700 "
        >
          <Plus strokeWidth={2.5} className="text-white size-6" />
        </Button>
      </div>
    </div>
  );
};

export default UserList;
