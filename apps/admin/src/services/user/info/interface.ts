import { IUser } from '../user-lists/interface';

interface IUserDetail extends IUser {
  gpu_package: boolean;
  api_key: string;
  my_api_count: number;
  my_api_package_count: number;
}

interface IGetUserInfoRequestPayload {
  id?: string;
}

type IGetUserInfoResponsePayload = IUserDetail;
interface IUpdateUserInfoRequest {
  id?: string;
  is_admin?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
}

export type {
  IUserDetail,
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
  IUpdateUserInfoRequest,
};
