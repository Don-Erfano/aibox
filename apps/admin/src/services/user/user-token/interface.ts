import { IPaginationMeta } from '@aibox/services';

export interface IUserToken {
  id: string;
  email: string;
  domain: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  access_token: string;
  refresh_token: string;
  expires: string;
}

export interface IGetUserTokenRequestPayload {
  email?: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export interface IGetUserTokenResponsePayload extends IPaginationMeta {
  user: IUserToken[];
}
