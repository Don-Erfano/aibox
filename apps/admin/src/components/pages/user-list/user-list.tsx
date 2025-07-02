import { FC } from 'react';
import { useDataTable, DataTable, TableToolbar, Button } from '@aibox/ui';
import userColumns from '@/components/pages/user-list/constant';
import { useGetUserList } from '@/services/user/user-lists';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { USERS_ROUTES } from '@/routes';
import { strings } from '@/constant';

const UserList: FC = () => {
  const { users, totalItems, totalPages, isLoading, isFetching, refetch } =
    useGetUserList();

  const router = useRouter();

  const { table, filterCount, resetFilters, submitFilters } = useDataTable({
    data: users,
    columns: userColumns,
    pageCount: totalPages,
    actions: {
      onEdit: (row) => router.push(`${USERS_ROUTES.LIST}/${row.id}`),
      onDelete: (row) => console.log(row.id),
    },
  });
  const handleAddUser = () => {
    router.push(USERS_ROUTES.ADD_USER);
  };
  return (
    <>
      <div className="relative h-full">
        <TableToolbar
          title={strings.users}
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
          className="absolute bottom-2 left-2 size-12 rounded-full bg-teal-600 shadow-2xl text-2xl hover:bg-teal-700"
        >
          <Plus strokeWidth={2.5} className="text-white size-6" />
        </Button>
      </div>
    </>
  );
};

export default UserList;
