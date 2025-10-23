import axios from 'axios';
import { FC } from 'react';

import { strings } from '@/constant';
import { useDownServer } from '@/services/gpu';
import { ConfirmModal, toast } from '@aibox/ui';

import { IDownServerModal } from './interface';

const DownServerModal: FC<IDownServerModal> = ({ id, handleClose }) => {
  const { mutate, isPending } = useDownServer();

  const handleDeleteLog = () => {
    mutate(id, {
      onSuccess: (d) => {
        toast.success(d.data.detail);
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
      variant="warning"
      open={!!id.user_id}
      onConfirm={handleDeleteLog}
      loading={isPending}
      onClose={handleClose}
      description={strings.downSeverDescription(id.email)}
    />
  );
};

export default DownServerModal;
