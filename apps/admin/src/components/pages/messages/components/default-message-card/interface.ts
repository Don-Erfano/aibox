export interface DeleteModalTypes {
  show: boolean;
  id: string;
}

export interface DefaultMessageCardProps {
  id: string;
  title_number: number;
  category_title: string;
  message: string;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onExpand?: (id: string) => void;
  deleteModal?: DeleteModalTypes;
  onDeleteModalChange?: (open: boolean) => void;
  onConfirmDelete?: () => void;
  isDeleting?: boolean;
}
