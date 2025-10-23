import { FC } from 'react';

import axios from 'axios';

import { useDeleteGpu, useGetGpusList } from '@/services/gpu';
import { ConfirmModal, toast } from '@aibox/ui';

const DeleteModal: FC<{
  openModal?: string;
  handleClose: (s?: string) => void;
}> = ({ openModal, handleClose }) => {
  const { mutate, isPending } = useDeleteGpu();
  const { refetch } = useGetGpusList();

  const handleDelete = () => {
    mutate(openModal, {
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data.error);
        }
      },
      onSuccess: (s) => {
        toast.success(s.data.detail);
        handleClose(undefined);
        refetch();
      },
    });
  };

  return (
    <ConfirmModal
      variant="delete"
      open={!!openModal}
      onConfirm={handleDelete}
      loading={isPending}
      onClose={() => handleClose(undefined)}
    />
  );
};

export default DeleteModal;
