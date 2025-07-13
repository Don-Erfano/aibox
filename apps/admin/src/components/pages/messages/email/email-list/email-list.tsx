'use client';

import { FC } from 'react';
import { useRouter } from 'next/navigation';
import {
  useDataTable,
  DataTable,
  TableToolbar,
  DataTableSkeleton,
  toast,
} from '@aibox/ui';
import { FabButton } from '@/components/fab-button';
import {
  IMassNotification,
  useDeleteMassNotification,
  useGetMassNotifications,
} from '@/services/messages/public-messages';
import { strings } from '@/constant';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { DeleteMessageModal } from '@/components/pages/messages/components/delete-message-modal';
import { MESSAGES_ROUTES } from '@/routes';
import EmailListColumns from './constant';

const EmailListPage: FC = () => {
  const router = useRouter();
  const {
    notifications,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  } = useGetMassNotifications({ notif_type: 'email' });

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [messageToDeleteId, setMessageToDeleteId] = useState<string | null>(
    null
  );
  const deleteMutation = useDeleteMassNotification();
  const queryClient = useQueryClient();

  const { table, filterCount, resetFilters, submitFilters } =
    useDataTable<IMassNotification>({
      data: notifications,
      columns: EmailListColumns,
      pageCount: totalPages,
      actions: {
        onDelete: (row) => {
          setMessageToDeleteId(row.id);
          setIsDeleteModalOpen(true);
        },
        onEdit: (row) => {
          router.push(`${MESSAGES_ROUTES.ADD_EMAIL_MESSAGE}/${row.id}`);
        },
      },
    });

  const handleAddEmailMessage = () => {
    router.push(MESSAGES_ROUTES.ADD_EMAIL_MESSAGE);
  };

  const handleConfirmDelete = () => {
    if (messageToDeleteId) {
      deleteMutation.mutate(
        { id: messageToDeleteId },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
            setIsDeleteModalOpen(false);
            toast.success(strings.messageDeled);
          },
        }
      );
    }
  };

  if (isLoading) {
    return <DataTableSkeleton columnCount={EmailListColumns.length} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-full">
        <TableToolbar
          title={strings.emailMessages}
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
          <DataTable table={table} />
        </div>
      </div>

      <FabButton onClick={handleAddEmailMessage} />

      <DeleteMessageModal
        isOpen={isDeleteModalOpen}
        messageId={messageToDeleteId || ''}
        onOpenChange={setIsDeleteModalOpen}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={deleteMutation.isPending}
      />
    </div>
  );
};

export default EmailListPage;
