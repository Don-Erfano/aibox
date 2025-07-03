import { Button, DeleteFactorIcon, Modal } from '@aibox/ui';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';

import { strings } from '@/constant';

import { DeleteModalProps } from './interface';
import { useDeleteNews } from '@/services/news';

export const DeleteNewsModal = ({
  modalState,
  toggleModal,
}: DeleteModalProps) => {
  const { mutate, isPending } = useDeleteNews();
  const queryClient = useQueryClient();

  const deleteNews = () => {
    mutate(modalState.id, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['newsList'] });
        toggleModal({ show: false, id: 0 });
      },
    });
  };

  return (
    <Modal
      open={modalState.show}
      onOpenChange={(show) => toggleModal({ show, id: 0 })}
      headerIcon={<DeleteFactorIcon />}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-teal-600 text-sm/6 font-medium">
          {strings.deleteModalTitle}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {strings.deleteModalDecription}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-2">
          <Button size="lg" isFilled disabled={isPending} onClick={deleteNews}>
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              strings.deleteButtonText
            )}
          </Button>
          <Button size="lg" onClick={() => toggleModal({ show: false, id: 0 })}>
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
