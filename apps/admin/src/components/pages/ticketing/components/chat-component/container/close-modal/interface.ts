export interface CloseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticketId: string | null;
  onSuccess?: () => void;
}
