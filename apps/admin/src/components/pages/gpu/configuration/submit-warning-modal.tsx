import { FC } from 'react';
import { ConfirmModal } from '@aibox/ui';
import { strings } from '@/constant';

const SubmitWarningModal: FC<{
  openModal: boolean;
  handleClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}> = ({ openModal, handleClose, onConfirm, loading }) => {
  return (
    <ConfirmModal
      variant="warning"
      open={openModal}
      onConfirm={onConfirm}
      loading={loading}
      description={strings.submitConfigurationWarning}
      onClose={handleClose}
    />
  );
};

export default SubmitWarningModal;
