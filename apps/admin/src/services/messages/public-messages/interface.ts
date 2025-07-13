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
export interface INotificationStatus {
  status: string;
  farsi_status: string;
}

export interface IGetMassNotificationsRequest {
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

export interface ICreateMassNotificationRequest {
  user: string;
  category: string;
  name?: string;
  from_time: string;
  to_time?: string;
  subject?: string;
  message?: string;
  message_text?: string;
  notif_type?: 'sms' | 'email' | 'in_app' | 'in_header';
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IUpdateMassNotificationMessageRequest {
  title: string;
  message: string;
  category: string;
}

export interface IGetMassNotificationCategoriesResponse {
  data: {
    category: ICategory[];
  };
}
export interface IDeleteMassNotificationMessagePathParams {
  id: string;
}

export interface IGetMassNotificationStatusResponse {
  notif_status: INotificationStatus[];
}

export interface IUpdateMassNotificationRequest {
  user: string;
  category: string;
  name: string;
  from_time: string;
  to_time?: string;
  subject: string;
  message: string;
  message_text: string;
}

export interface IGetMassNotificationByIdResponse {
  id: string;
  user: {
    id: string;
    email: string;
    role: string;
  }[];
  subject: string;
  name: string;
  from_time: string;
  to_time: string;
  status: string;
  category: {
    id: string;
    name: string;
  };
  message: {
    id: string;
    title: string;
    message: string;
  };
  user_group: string;
}

export type IDeleteMassNotificationMessageResponse = Record<string, never>;

export interface IGetMassNotificationsResponse extends IPaginationMeta {
  data: IMassNotification[];
}
export interface ICreateMassNotificationResponse {
  data: IMassNotification;
}
