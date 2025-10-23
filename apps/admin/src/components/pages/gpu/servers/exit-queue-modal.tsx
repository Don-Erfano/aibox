import { FC } from 'react';

import { strings } from '@/constant';
import { useExitQueue, useGetServers } from '@/services/gpu';
import { ConfirmModal, toast } from '@aibox/ui';

import { IExitModalProps } from './interface';
import axios from 'axios';

const ExitQueueModal: FC<IExitModalProps> = ({ handleClose, id }) => {
  const { mutate, isPending } = useExitQueue();
  const { refetch } = useGetServers();

  const handleExitQueue = () => {
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
      variant="warning"
      open={!!id.user_id}
      onConfirm={handleExitQueue}
      loading={isPending}
      onClose={handleClose}
      description={strings.exitQueueDesc(id.email)}
    />
  );
};

export default ExitQueueModal;
