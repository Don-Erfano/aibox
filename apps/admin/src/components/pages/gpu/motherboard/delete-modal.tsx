import { FC } from 'react';
import { isAxiosError } from 'axios';
import { usePathname, useRouter } from 'next/navigation';

import { useDeleteMotherboard, useGetMotherboardsList } from '@/services/gpu';
import { GPU_ROUTES } from '@/routes';
import { ConfirmModal, toast } from '@aibox/ui';

const DeleteModal: FC<{
  openModal?: string;
  handleClose: (s?: string) => void;
}> = ({ handleClose, openModal }) => {
  const { mutate, isPending } = useDeleteMotherboard();
  const { push } = useRouter();
  const pathName = usePathname();
  const { refetch } = useGetMotherboardsList();

  const handleSubmit = () => {
    mutate(openModal, {
      onError: (e) => {
        if (isAxiosError(e)) {
          toast.error(e.response?.data.error);
        }
      },
      onSuccess: (s) => {
        handleClose(undefined);
        toast.success(s.data.detail);
        refetch();
        if (pathName !== GPU_ROUTES.MOTHERBOARDS) {
          push(GPU_ROUTES.MOTHERBOARDS);
        }
      },
    });
  };

  return (
    <ConfirmModal
      variant="delete"
      open={!!openModal}
      onConfirm={handleSubmit}
      loading={isPending}
      onClose={() => handleClose(undefined)}
    />
  );
};

export default DeleteModal;
