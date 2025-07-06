import { Button, DeleteFactorIcon, Modal } from '@aibox/ui';
import { useQueryClient } from '@tanstack/react-query';
import { LoaderIcon } from 'lucide-react';

import { strings } from '@/constant';
import { useDeleteFactor } from '@/services/factor';

import { DeleteFactorModalProps } from './interface';

export const DeleteFactorModal = ({
  modalState,
  toggleModal,
}: DeleteFactorModalProps) => {
  const { mutate, isPending } = useDeleteFactor();
  const queryClient = useQueryClient();

  const deleteFacor = () => {
    mutate(modalState.id || '', {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['factors'] });
        toggleModal({ show: false });
      },
    });
  };

  return (
    <Modal
      open={modalState.show}
      onOpenChange={(show) => toggleModal({ show })}
      headerIcon={<DeleteFactorIcon />}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-teal-600 text-sm/6 font-medium">
          {strings.deleteModalTitle}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {strings.deleteModalDecription}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-5">
          <Button size="lg" isFilled disabled={isPending} onClick={deleteFacor}>
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              strings.deleteButtonText
            )}
          </Button>
          <Button size="lg" onClick={() => toggleModal({ show: false })}>
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
