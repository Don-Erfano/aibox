import { IUser } from '../user-lists/interface';

export interface IUserDetail extends IUser {
  gpu_package: boolean;
  api_key: string;
  my_api_count: number;
  my_api_package_count: number;
}

export interface IGetUserInfoRequestPayload {
  id?: string;
}

export type IGetUserInfoResponsePayload = IUserDetail;
