import { FC } from 'react';

import {
  useDataTable,
  DataTable,
  TableToolbar,
  GenericActionBar,
  DataTableSkeleton,
} from '@aibox/ui';
import { useGetUserList } from '@/services/user/user-lists';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { UserStrings } from '@/components/pages/user/user-list/string';
import { FabButton } from '@/components/fab-button';
import userColumns from '@/components/pages/user/user-list/constant';

const UserList: FC = () => {
  const router = useRouter();
  const { users, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetUserList();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => router.push(`/dashboard/user-list/${row.id}`),
      onDelete: (row) => console.log(row.id),
    },
  });
  const handleAddUser = () => {
    router.push('/dashboard/user-list/add-user');
  };

  if (isLoading) return <DataTableSkeleton columnCount={10} />;

  return (
    <div className="min-h-screen flex-col">
      <div className="relative w-full shadow-2xl px-11 py-5 rounded-sm">
        <TableToolbar
          title={UserStrings.users}
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
      <FabButton onClick={handleAddUser} />
    </div>
  );
};

export default UserList;
