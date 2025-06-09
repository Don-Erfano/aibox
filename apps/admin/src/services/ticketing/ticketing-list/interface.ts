import { IPaginationMeta } from '@aibox/services';

export type TicketStatus = 'opened' | 'closed';
export type TicketLevel = 'low' | 'medium' | 'high';

export interface ITicket {
  id: string;
  ticket_num: string;
  created_at: string;
  category: string;
  subject: string;
  status: TicketStatus;
  level: TicketLevel;
  unseen_messages: number;
  user_id: string;
  operator_id: string;
}

export interface IAnswerAdmin {
  question: string;
  answer: string;
}

export interface IOperatorTicketAssign {
  assign_me: boolean;
  operator_id?: string;
}

// get ticketing list
export interface IGetTicketListRequest {
  category?: string;
  status?: TicketStatus;
  level?: TicketLevel;
  created_at__lte?: string;
  created_at__gte?: string;
  user_id?: string;
  operator_id?: string;
  question_key?: number;
  question_value?: number;
  page_size?: number;
  page_number?: number;
  ordering?: string;
  search?: string;
}

export interface IGetTicketListResponse extends IPaginationMeta {
  data: ITicket[];
}

// add ticket
export interface IPostTicketRequest {
  category: string;
  subject: string;
  level: TicketLevel;
  body: string;
  user_list: string[];
  attachments?: string | null;
  answers: IAnswerAdmin[] | null;
  admin_data?: string;
}

// assign ticket
export interface IAssignTicketRequest {
  data: IOperatorTicketAssign;
}

export interface IAssignTicketPathParams {
  id: string;
}

export type IAssignTicketResponse = IOperatorTicketAssign;

// update ticket status
export interface IUpdateTicketStatusRequest {
  id: string;
  status: TicketStatus;
}

export type IUpdateTicketStatusResponsePayload = {
  status: TicketStatus;
};
