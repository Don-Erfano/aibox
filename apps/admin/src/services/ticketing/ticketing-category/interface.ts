export interface ITicketingCategoryQuestion {
  id: string;
  text: string;
  key: string;
  api: string;
  admin_api: string;
  parent: string;
}

export interface ITicketingCategory {
  id: string;
  name: string;
  ticket_count: number;
  questions: ITicketingCategoryQuestion[];
  logo: string;
}

export interface IGetTicketingCategoryRequestPayload {
  name?: string;
  page_size?: number;
  page_number?: number;
  ordering?: string;
  tab?: string;
}

export interface IGetTicketingCategoryResponsePayload {
  data: ITicketingCategory[];
  page_count: number;
  total_count: number;
}

export interface IGetSingleTicketingCategoryResponsePayload {
  data: ITicketingCategory;
}

export interface IUserApi {
  id: string;
  name: string;
  unfinished_version_id: string;
  all_version: string[];
  is_editable: boolean;
}

export interface RawUserApi {
  id: string;
  name: string;
  all_version: { id: string; version: string }[];
}

export interface IGetUserApisResponsePayload {
  apis: IUserApi[];
}

export interface ICategoryQuestion {
  text: string;
  parent: string;
  key: string;
  api: string;
}

export interface IUpdateTicketingCategoryRequestPayload {
  questions: ICategoryQuestion[];
  name: string;
  logo?: string;
}

export interface IUpdateTicketingCategoryResponsePayload {
  message: string;
  data: ITicketingCategory;
}

export interface ICreateTicketingCategoryRequestPayload {
  questions?: ICategoryQuestion[];
  name: string;
  logo?: string;
}

export interface ICreateTicketingCategoryResponsePayload {
  message: string;
  data: ITicketingCategory;
}
export interface IDeleteTicketingCategoryResponsePayload {
  message: string;
}
