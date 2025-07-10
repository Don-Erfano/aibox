export interface TicketsListProps {
  onTicketSelect: (ticketId: string) => void;
  selectedTicketId: string | null;
}
