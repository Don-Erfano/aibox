import { IPaginationMeta } from '@aibox/services';

export interface IMassNotification {
  id: string;
  category: string;
  name: string;
  from_time: string;
  to_time: string;
  status: string;
  message_title: string;
  user: string;
}

export interface IGetMassNotificationsRequestPayload {
  from_time__gte?: string;
  from_time__lte?: string;
  category?: string;
  message_title?: string;
  notif_type?: string;
  status?: string;
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export interface ICreateMassNotificationRequestPayload {
  user: string;
  category: string;
  name: string;
  from_time: string;
  to_time?: string;
  subject: string;
  message?: string;
  message_text?: string;
  notif_type?: 'sms' | 'email' | 'in_app' | 'in_header';
}

export interface IGetMassNotificationsResponsePayload extends IPaginationMeta {
  data: IMassNotification[];
}
export interface ICreateMassNotificationResponsePayload {
  data: IMassNotification;
}
