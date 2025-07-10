import { TicketApiMessage } from '@/components/pages/ticketing/components/chat-component/chat-section/components/chat-message/interface';

export interface Ticket {
  id: string;
  subject: string;
  user_id: string;
  messages: TicketApiMessage[];
  category: string;
  answer: string;
  operator_id: string;
  operator_avatar: string;
  status: string;
  user: string;
  user_avatar: string;
}

export interface ChatHeaderProps {
  ticket: Ticket;
  formatRelativeTime: (date: string) => string;
}
