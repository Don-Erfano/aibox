import { FC } from 'react';

import { ConfirmModal, toast } from '@aibox/ui';
import { useDeleteGpuLog, useGetGpuLogsList } from '@/services/gpu';
import axios from 'axios';

const DeleteLogModal: FC<{ handleClose: () => void; id: string }> = ({
  handleClose,
  id,
}) => {
  const { mutate, isPending } = useDeleteGpuLog();
  const { refetch } = useGetGpuLogsList();

  const handleDeleteLog = () => {
    mutate(id, {
      onSuccess: (d) => {
        toast.success(d.data.detail);
        refetch();
        handleClose();
      },
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data.error);
        }
      },
    });
  };

  return (
    <ConfirmModal
      variant="delete"
      open={!!id}
      onConfirm={handleDeleteLog}
      loading={isPending}
      onClose={handleClose}
    />
  );
};

export default DeleteLogModal;
