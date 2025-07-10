export interface DeleteModal {
  show: boolean;
  id: string;
}

export interface DeleteModalProps {
  modalState: DeleteModal;
  toggleModal: React.Dispatch<React.SetStateAction<DeleteModal>>;
}
