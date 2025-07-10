export interface TicketDetailProps {
  id: string;
  username: string;
  status?: 'opened' | 'closed';
  status_name: 'admin_answer' | 'user_answer' | 'closed';
  message: string;
  priority: 'high' | 'medium' | 'low';
  time: string;
  isSelected?: boolean;
  onClick?: () => void;
  unseenMessages?: number;
}
