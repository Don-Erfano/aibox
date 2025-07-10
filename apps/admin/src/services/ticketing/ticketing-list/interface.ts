import { IPaginationMeta } from '@aibox/services';

export type TicketStatus = 'opened' | 'closed';
export type TicketLevel = 'low' | 'medium' | 'high';
export type TicketStatusName = 'admin_answer' | 'user_answer' | 'closed';

export interface ITicketMessage {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
  attachments: string;
  seen: boolean;
}

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
  operator: string;
  user: string;
  operator_id: string;
}

export interface ITicketWithLastMessage extends ITicket {
  last_message: ITicketMessage;
  status_name: TicketStatusName;
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
  user: string;
  operator_id?: string;
  operator: string;
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

// get all tickets
export interface IGetAllTicketsResponse {
  results: ITicketWithLastMessage[];
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

export interface IUpdateTicketCategoryRequest {
  category: string;
  answers?: IAnswerAdmin[] | null;
}

export interface IUpdateTicketCategoryPathParams {
  id: string;
}

export interface IUpdateTicketCategoryPayload {
  data: IUpdateTicketCategoryRequest;
}

export type IUpdateTicketCategoryResponse = ITicket;

export interface ITicketMessage {
  id: string;
  body: string;
  author_id: string;
  created_at: string;
  attachments: string;
  seen: boolean;
}

export interface ITicketDetail {
  id: string;
  category: string;
  subject: string;
  level: TicketLevel;
  operator_id: string;
  operator_avatar: string;
  status: TicketStatus;
  messages: ITicketMessage[];
  user_id: string;
  operator: string;
  user: string;
  user_avatar: string;
  answer: string;
  is_editable: boolean;
}

export interface IGetTicketDetailPathParams {
  id: string;
}

export interface IGetTicketDetailResponse {
  data: ITicketDetail;
}

export interface IAnswerTicketRequest {
  body: string;
  attachments?: string | null;
}

export interface IAnswerTicketPathParams {
  id: string;
}

export interface IAnswerTicketPayload {
  data: IAnswerTicketRequest;
}

export type IAnswerTicketResponse = ITicketMessage;
