export interface TicketApiMessage {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
  attachments: string;
  seen: boolean;
}

export interface Ticket {
  id: string;
  user: string;
  messages: TicketApiMessage[];
  status: string;
  user_id: string;
  user_avatar: string;
  operator_id: string;
  operator_avatar: string;
}

export interface ConvertedMessage {
  id: string;
  content: string;
  sender: 'user' | 'admin';
  senderName: string;
  timestamp: string;
  date: string;
  avatar: string;
  senderId: string;
  hasAttachment: boolean;
  fileUrl: string;
  fileType: string;
  attachmentName: string;
}
export interface ChatMessageProps {
  ticket: Ticket;
}
