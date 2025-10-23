'use client';

import { ConfirmModal } from '@aibox/ui';
import { strings } from '@/constant';
import { useApporvePackage } from '@/services/gpu';

import { ApprovalModalState } from './interface';

export const ApproveModal = ({
  modalState,
  toggleModal,
}: ApprovalModalState) => {
  const { show, id } = modalState;

  const { mutate, isPending } = useApporvePackage();

  const onConfirm = () => {
    if (id) {
      mutate(
        { id, data: { is_approved: true } },
        {
          onSuccess: () => {
            toggleModal({ show: false });
          },
        }
      );
    }
  };

  return (
    <ConfirmModal
      open={show}
      variant="warning"
      description={strings.approveUserPackageDescription}
      onConfirm={onConfirm}
      onClose={() => toggleModal({ show: false })}
      loading={isPending}
    />
  );
};
