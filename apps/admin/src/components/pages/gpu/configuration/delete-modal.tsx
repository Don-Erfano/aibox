import { FC } from 'react';
import { ConfirmModal, toast } from '@aibox/ui';
import {
  useDeleteConfiguration,
  useGetConfigurationData,
} from '@/services/gpu';
import axios from 'axios';
import { strings } from '@/constant';

const DeleteModal: FC<{
  openModal?: string;
  handleClose: (s?: string) => void;
}> = ({ handleClose, openModal }) => {
  const { mutate, isPending } = useDeleteConfiguration();
  const { refetch } = useGetConfigurationData();

  const handleClick = () => {
    mutate(openModal, {
      onError: (e) => {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.data.error);
        }
      },
      onSuccess: (s) => {
        refetch();
        handleClose(undefined);
        toast.success(strings.deleteGpuPackageModalSuccess);
      },
    });
  };

  return (
    <ConfirmModal
      variant="delete"
      open={!!openModal}
      onConfirm={handleClick}
      loading={isPending}
      description={strings.deleteGpuPackageModalDescription}
      onClose={() => handleClose(undefined)}
    />
  );
};

export default DeleteModal;
