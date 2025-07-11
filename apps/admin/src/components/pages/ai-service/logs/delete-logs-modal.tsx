'use client';

import { Button, Modal, ModalDeleteIcon } from '@aibox/ui';

import { strings } from '@/constant';
import { useDeleteUserPackage } from '@/services/api-package';

import { DeleteLogsModalProps } from './interface';

export const DeleteLogsModal = ({
  modal,
  toggleModal,
}: DeleteLogsModalProps) => {
  const { show, ids, logData, onSuccessSubmit } = modal;

  const logIds = ids || [];
  const isMultiple = logIds.length > 1 || !logData;

  const { mutate, isPending } = useDeleteUserPackage();

  const closeModal = () => {
    toggleModal({ show: false });
  };

  const openModal = () => {
    toggleModal({ show: true });
  };

  const deleteLogs = () => {
    if (ids)
      mutate(ids, {
        onSuccess: () => {
          closeModal();
          if (onSuccessSubmit) onSuccessSubmit();
        },
      });
  };

  return (
    <Modal
      open={show}
      headerIcon={<ModalDeleteIcon />}
      onOpenChange={openModal}
      onClose={closeModal}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-teal-600 text-sm/6 font-medium">
          {strings.areYouSure}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {isMultiple
            ? strings.deleteLogWithNumberDescription(logIds?.length)
            : strings.deleteLogDescriptionWithLogInfo(
                logData?.package.api,
                logData?.user.nick_name
              )}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-5">
          <Button size="lg" isFilled disabled={isPending} onClick={deleteLogs}>
            {strings.remove}
          </Button>
          <Button size="lg" onClick={closeModal}>
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
