'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDataTable,
  DataTable,
  TableToolbar,
  GenericActionBar,
  DataTableSkeleton,
} from '@aibox/ui';
import { FabButton } from '@/components/fab-button';
import publicMessageColumns from './constant';
import { useGetMassNotifications } from '@/services/messages/messages-list/message-list.hook';
import { IMassNotification } from '@/services/messages/messages-list/interface';
import { strings } from '@/constant';

const PublicMessagePage: FC = () => {
  const router = useRouter();
  const {
    notifications,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  } = useGetMassNotifications();

  const { table, filterCount, resetFilters, submitFilters } =
    useDataTable<IMassNotification>({
      data: notifications,
      columns: publicMessageColumns,
      pageCount: totalPages,
      actions: {
        onEdit: (row) => {
          console.log('edit:', row.id);
        },
        onDelete: (row) => {
          console.log('delete:', row.id);
        },
      },
    });

  const handleAddPublicMessage = () => {
    router.push('messages/add-public-message');
  };

  if (isLoading) {
    return <DataTableSkeleton columnCount={publicMessageColumns.length} />;
  }

  return (
    <div className="min-h-screen flex flex-col ">
      <div className="w-full">
        <TableToolbar
          title={strings.generalMessages}
          totalItems={totalItems}
          table={table}
          refreshLoading={isLoading || isFetching}
          refetch={refetch}
          submitFilters={submitFilters}
          resetFilters={resetFilters}
          filterCount={filterCount}
          noManageColumns
        />

        <div className="p-4">
          <DataTable
            table={table}
            actionBar={
              <GenericActionBar
                table={table}
                onDelete={(ids) => {
                  console.log('deleted:', ids);
                }}
                onEdit={(ids) => {
                  console.log('editing:', ids);
                }}
              />
            }
          />
        </div>
      </div>

      <FabButton onClick={handleAddPublicMessage} />
    </div>
  );
};

export default PublicMessagePage;
