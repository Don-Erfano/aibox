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

export interface IUserInfo {
  user: {
    id: string;
    email: string;
    phone_number: string;
    nickname: string;
    first_name: string;
    last_name: string;
    gender: string;
    profile_picture: string;
    email_verified: boolean;
    phone_verified: boolean;
    is_admin: boolean;
    is_staff: boolean;
    demo_status: string;
  };
  charge: string;
  gpu_package: boolean;
  my_api_count: number;
  my_api_package_count: number;
  api_key: {
    api_key: string;
  };
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

export interface IGetAllUsers {
  users: Pick<IUser, 'id' | 'email' | 'phone_number'>[];
}

export interface IPutUser {
  id: string;
  first_name?: string;
  last_name?: string;
  nickname?: string;
  phone_number?: string;
  gender?: string;
  is_active?: string;
  profile_picture?: string;
}
