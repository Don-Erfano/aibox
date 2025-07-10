export interface DeleteMessageModalProps {
  isOpen: boolean;
  messageId: string;
  onOpenChange?: (open: boolean) => void;
  onConfirmDelete?: () => void;
  isDeleting?: boolean;
}
