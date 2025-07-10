export interface ICategory {
  id: string;
  name: string;
}

export interface INotifMessage {
  title: string;
  message: string;
  id: string;
  category: ICategory;
}

export interface INotifMessageData {
  notif_message: INotifMessage[];
}

export interface ICreateNotifMessage {
  title: string;
  message: string;
  category: string;
}

export interface ICreateNotifMessageResponse {
  id: string;
  title: string;
  message: string;
  category: ICategory;
}

export interface IDeleteNotifMessageResponse {
  id: string;
}
