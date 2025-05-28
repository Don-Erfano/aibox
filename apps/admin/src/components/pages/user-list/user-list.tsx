import { FC } from 'react';
import {
  useDataTable,
  DataTable,
  TableToolbar,
  GenericActionBar,
  Button,
  DataTableSkeleton,
} from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const UserList: FC = () => {
  const router = useRouter();
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
  const handleAddUser = () => {
    router.push('/dashboard/user-list/add-user');
  };

  if (isLoading) return <DataTableSkeleton columnCount={10} />;

  return (
    <>
      <div className="relative h-full">
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
        <Button
          onClick={handleAddUser}
          variant="ghost"
          className="absolute bottom-2 left-2 size-12 rounded-full bg-teal-600 shadow-2xl text-2xl hover:bg-teal-700"
        >
          <Plus strokeWidth={2.5} className="text-white size-6" />
        </Button>
      </div>
    </>
  );
};

export default UserList;
