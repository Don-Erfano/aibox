import { UsersApiPackage } from '@/services/api-package';

export interface ModalState {
  show: boolean;
  ids?: string[];
  logData?: UsersApiPackage;
  onSuccessSubmit?: () => void;
}

export interface DeleteLogsModalProps {
  modal: ModalState;
  toggleModal: React.Dispatch<React.SetStateAction<ModalState>>;
}
