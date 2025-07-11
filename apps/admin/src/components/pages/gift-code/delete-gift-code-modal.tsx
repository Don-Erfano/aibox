import { Button, ModalDeleteIcon, Modal } from '@aibox/ui';
import { useQueryClient } from '@tanstack/react-query';

import { strings } from '@/constant';
import { useDeleteGiftCode } from '@/services/gift-code';

import { DeleteGiftCodeModalProps } from './interface';

export const DeleteGiftCodeModal = ({
  modalState,
  toggleModal,
}: DeleteGiftCodeModalProps) => {
  const { mutate, isPending } = useDeleteGiftCode();
  const queryClient = useQueryClient();

  const deleteGiftCode = () => {
    mutate(modalState.id || '', {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['giftCodes'] });
        toggleModal({ show: false });
      },
    });
  };

  return (
    <Modal
      open={modalState.show}
      onOpenChange={(show) => toggleModal({ show })}
      headerIcon={<ModalDeleteIcon />}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-teal-600 text-sm/6 font-medium">
          {strings.deleteModalTitle}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {strings.deleteModalDescription}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-2">
          <Button
            size="lg"
            isFilled
            disabled={isPending}
            onClick={deleteGiftCode}
          >
            {strings.delete}
          </Button>
          <Button size="lg" onClick={() => toggleModal({ show: false })}>
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
