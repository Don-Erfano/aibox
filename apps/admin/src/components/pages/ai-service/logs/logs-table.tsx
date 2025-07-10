'use client';

import {
  Button,
  DataTable,
  DataTableActionBar,
  DataTableActionBarSelection,
  DataTableSkeleton,
  TableToolbar,
  useDataTable,
} from '@aibox/ui';
import { Trash2 } from 'lucide-react';
import { useMemo, useState } from 'react';

import { strings } from '@/constant';
import { useGetAllApis, useGetUsersApiPackages } from '@/services/api-package';
import { useGetAllUsers } from '@/services/user/user-lists';

import { getLogsTableColumns } from './constants';
import { DeleteLogsModal } from './delete-logs-modal';
import { ModalState } from './interface';

export const LogsTable = () => {
  const {
    usersApiPackages,
    isLoading,
    isFetching,
    refetch,
    totalItems,
    totalPages,
  } = useGetUsersApiPackages();

  const [modal, setModal] = useState<ModalState>({ show: false });

  const { data: users, isPending: isUsersPending } = useGetAllUsers();
  const { data: apis, isPending: isApisPending } = useGetAllApis();

  const usersOptions = users?.data.data.users.map((user) => ({
    label: user.email,
    value: user.id,
  }));
  const apisOptions = apis?.map((api) => ({
    label: api.name,
    value: api.name,
  }));

  const logsColumns = useMemo(
    () => getLogsTableColumns({ apisOptions, usersOptions }),
    [usersOptions, apisOptions]
  );

  const { table, filterCount, submitFilters, resetFilters } = useDataTable({
    data: usersApiPackages,
    columns: logsColumns,
    pageCount: totalPages,
    enableRowSelection: true,
    actions: {
      onDelete: (row) => {
        setModal({
          show: true,
          ids: [row.id],
          logData: row,
          onSuccessSubmit: () => {
            table.resetRowSelection();
          },
        });
      },
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  if (isLoading || isUsersPending || isApisPending)
    return <DataTableSkeleton columnCount={10} />;

  return (
    <div className="px-11 py-10">
      <DeleteLogsModal modal={modal} toggleModal={setModal} />
      <TableToolbar
        table={table}
        title={strings.reports}
        totalItems={totalItems}
        refetch={refetch}
        submitFilters={submitFilters}
        refreshLoading={isLoading || isFetching}
        resetFilters={resetFilters}
        filterCount={filterCount}
        noManageColumns
      />

      <DataTable
        table={table}
        actionBar={
          <DataTableActionBar table={table} visible={selectedRows.length > 0}>
            <DataTableActionBarSelection table={table} />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setModal({
                  show: true,
                  ids: selectedRows.map((row) => row.original.id),
                  onSuccessSubmit: () => {
                    table.resetRowSelection();
                  },
                });
              }}
            >
              <Trash2 />
            </Button>
          </DataTableActionBar>
        }
      />
    </div>
  );
};
