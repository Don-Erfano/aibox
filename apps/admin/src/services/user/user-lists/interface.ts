import { IPaginationMeta } from '@aibox/services';

export interface IUser {
  id: string;
  email: string;
  gender: 'M' | 'F' | 'U';
  created_at: string;
  domain: string;
  phone_number: string;
  nickname: string;
  first_name: string;
  last_name: string;
  profile_picture: string;
  last_login: string;
  is_admin: boolean;
  is_active: boolean;
  email_verified: boolean;
  phone_verified: boolean;
  is_staff: boolean;
  my_api_count: number;
  my_api_package_count: number;
  gpu_package: boolean;
}

export interface IGetUserListRequestPayload {
  email?: string;
  nickname?: string;
  domain?: string;
  last_login__gte?: string;
  last_login__lte?: string;
  created_at__gte?: string;
  created_at__lte?: string;
  is_active?: boolean;
  is_admin?: boolean;
  page?: number;
  page_size?: number;
  search?: string;
  ordering?: string;
}

export interface IGetUserListResponsePayload extends IPaginationMeta {
  user: IUser[];
}

export interface IAddUserRequestPayload {
  email: string;
  is_admin: boolean;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  gender?: 'M' | 'F' | 'U';
  phone_number?: string;
  is_staff?: boolean;
}

export interface IAddUserResponsePayload {
  user: IUser;
}

export interface IPutUser {
  id: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  phone_number?: string;
  gender?: string;
  is_active?: string;
}
