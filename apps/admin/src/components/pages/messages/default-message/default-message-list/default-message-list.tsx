'use client';
import { FC, useState } from 'react';
import { Tab, toast } from '@aibox/ui';
import { useRouter } from 'next/navigation';
import {
  useGetCategories,
  useGetContentMessages,
  useDeleteNotifMessage,
} from '@/services';
import { NoMessageTemplate } from '@/components/pages/messages/components/no-message-template';
import {
  DefaultMessageCard,
  DeleteModalTypes,
} from '@/components/pages/messages/components/default-message-card';
import { FabButton } from '@/components/fab-button';
import { MESSAGES_ROUTES } from '@/routes';

const DefaultMessageList: FC = () => {
  const router = useRouter();

  const { categories } = useGetCategories();
  const { notifMessages } = useGetContentMessages();
  const deleteNotifMessage = useDeleteNotifMessage();

  const [deleteModal, setDeleteModal] = useState<DeleteModalTypes>({
    show: false,
    id: '',
  });

  const handleAddMessage = () => {
    router.push(MESSAGES_ROUTES.DEFAULT_MESSAGE);
  };

  const handleEdit = (id: string) => {
    router.push(`${MESSAGES_ROUTES.DEFAULT_MESSAGE}/add-message/${id}`);
  };

  const handleExpand = (id: string) => {
    console.log(`Expand clicked for message ID: ${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteModal({ show: true, id });
  };

  const handleDeleteModalChange = (open: boolean) => {
    setDeleteModal({ ...deleteModal, show: open });
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteNotifMessage.mutateAsync(deleteModal.id);
      setDeleteModal({ show: false, id: '' });
      toast.success(response?.detail);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
  };

  const renderCategoryMessages = (categoryId: string, categoryName: string) => {
    const categoryMessages = notifMessages.filter(
      (message) => message.category.id === categoryId
    );

    if (categoryMessages.length === 0) {
      return (
        <div className="h-[calc(100vh-200px)] flex items-center justify-center">
          <NoMessageTemplate onClick={handleAddMessage} />
        </div>
      );
    }

    return (
      <div className="flex flex-wrap space-x-6 space-y-6 mt-10">
        {categoryMessages.map((message, index) => (
          <DefaultMessageCard
            key={message.id}
            id={message.id}
            title_number={index + 1}
            category_title={categoryName}
            message={message.message}
            onExpand={handleExpand}
            onEdit={handleEdit}
            onDelete={handleDelete}
            deleteModal={deleteModal}
            onDeleteModalChange={handleDeleteModalChange}
            onConfirmDelete={confirmDelete}
            isDeleting={deleteNotifMessage.isPending}
          />
        ))}
        <FabButton onClick={handleAddMessage} />
      </div>
    );
  };

  const tabs =
    categories && categories.length > 0
      ? categories.map((category) => ({
          id: category.id,
          name: category.name,
          content: renderCategoryMessages(category.id, category.name),
        }))
      : [
          {
            id: 'no-categories',
            name: '',
            content: (
              <div className="h-[calc(100vh-200px)] flex items-center justify-center">
                <NoMessageTemplate onClick={handleAddMessage} />
              </div>
            ),
          },
        ];

  return (
    <div>
      <Tab tabs={tabs} />
    </div>
  );
};

export default DefaultMessageList;
