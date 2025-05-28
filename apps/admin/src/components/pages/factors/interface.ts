export interface DeleteModal {
  show: boolean;
  id?: string;
}

export interface DeleteFactorModalProps {
  modalState: DeleteModal;
  toggleModal: React.Dispatch<React.SetStateAction<DeleteModal>>;
}
