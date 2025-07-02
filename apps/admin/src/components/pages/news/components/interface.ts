import { NewsSchemaType } from '../schema';

export interface UserFormProps {
  title: string;
  initialData?: Partial<NewsSchemaType>;
  onSubmit: (data: NewsSchemaType) => void;
  isLoading?: boolean;
}
export interface DeleteModal {
  show: boolean;
  id: number;
}

export interface DeleteModalProps {
  modalState: DeleteModal;
  toggleModal: React.Dispatch<React.SetStateAction<DeleteModal>>;
}
