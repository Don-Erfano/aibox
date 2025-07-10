import { FC } from 'react';
import { Button, ModalDeleteIcon, Modal } from '@aibox/ui';
import { strings } from '@/constant';
import { DeleteMessageModalProps } from './interface';

const DeleteMessageModal: FC<DeleteMessageModalProps> = ({
  isOpen,
  messageId,
  onOpenChange,
  onConfirmDelete,
  isDeleting = false,
}) => {
  return (
    <Modal
      open={isOpen}
      onOpenChange={(open) => onOpenChange?.(open)}
      headerIcon={<ModalDeleteIcon />}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-slate-950 text-sm/6 font-medium">
          {strings.deleteModalTitle}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {strings.deleteModalText}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-5">
          <Button
            size="lg"
            isFilled
            disabled={isDeleting}
            onClick={() => onConfirmDelete?.()}
          >
            {strings.remove}
          </Button>
          <Button size="lg" onClick={() => onOpenChange?.(false)}>
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
export default DeleteMessageModal;
