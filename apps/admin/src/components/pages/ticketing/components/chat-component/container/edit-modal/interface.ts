export interface EditTicketFormProps {
  ticketId: string;
  onSuccess: () => void;
}

export interface CategoryOption {
  id: string | number;
  label: string;
}
