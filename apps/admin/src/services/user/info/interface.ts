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
  id: string;
  is_admin?: boolean;
  is_staff?: boolean;
  is_active?: boolean;
}

interface IUserApiPackageDetail {
  user: {
    id: string;
    nick_name: string;
    role: string;
    email: string;
    profile_picture: string;
  };
  package: {
    version: string;
    api: string;
    type: string;
    name: string;
    monthly_limit: number;
    daily_limit: number;
  };
  id: string;
  created_at: string;
  count_api_package: 14;
  expired_date: string;
  count_monthly_api_call: number;
  count_daily_api_call: number;
}
interface IGetUserApiPackageResponsePayload {
  list: IUserApiPackageDetail[];
  total_count: number;
  page_count: number;
}

interface IGetUserApiPackageRequestPayload {
  name?: string;
  page?: number;
  tab?: string;
  type?: string;
  search?: string;
  version?: string;
  ordering?: string;
  api__name?: string;
  page_size?: number;
  created_at__lte?: string;
  created_at__gte?: string;
  expired_date__gte?: string;
  expired_date__lte?: string;
  count_api_package__gte?: number;
  count_api_package__lte?: number;
  count_monthly_api_call__gte?: number;
  count_monthly_api_call__lte?: number;
}

export type {
  IUserDetail,
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
  IUpdateUserInfoRequest,
  IGetUserApiPackageResponsePayload,
  IGetUserApiPackageRequestPayload,
  IUserApiPackageDetail,
};
