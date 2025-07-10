import { Button, Modal, WarningIcon } from '@aibox/ui';
import { LoaderIcon } from 'lucide-react';

import { strings } from '@/constant';

import { DeleteModalProps } from './interface';
import { useDeployServer } from '@/services/operation-service';

export const StartServerModal = ({
  modalState,
  toggleModal,
}: DeleteModalProps) => {
  const { mutate, isPending } = useDeployServer();

  const startServer = () => {
    mutate({ version: modalState.id });
    toggleModal({ show: false, id: '' });
  };

  return (
    <Modal
      open={modalState.show}
      onOpenChange={(show) => toggleModal({ show, id: '' })}
      headerIcon={<WarningIcon />}
    >
      <div className="flex flex-col justify-between items-center">
        <span className="text-teal-600 text-sm/6 font-medium">
          {strings.deleteModalTitle}
        </span>
        <span className="mt-3 mb-8 text-neutral-900 text-center text-sm/6 font-normal">
          {strings.startServerMSG}
        </span>

        <div className="flex flex-col sm:flex-row sm:justify-center items-center w-full gap-5">
          <Button size="lg" isFilled disabled={isPending} onClick={startServer}>
            {isPending ? (
              <LoaderIcon className="animate-spin" />
            ) : (
              strings.confirm
            )}
          </Button>
          <Button
            size="lg"
            onClick={() => toggleModal({ show: false, id: '' })}
          >
            {strings.cancel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
