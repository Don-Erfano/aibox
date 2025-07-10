export interface TicketCounts {
  all: number;
  assigned: number;
  open: number;
}

export interface TicketTabProps {
  ticketCounts: TicketCounts;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}
