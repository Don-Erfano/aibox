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

interface IGetUserGpuPckageResponsePayload {
  [x: string]: any;
  list: {
    id: string;
    payment_type: string;
    hourly_price: string;
    remaining_time: string;
    remaining_disk_volume: string;
    gpu_motherboard: {
      id: string;
      gpu: {
        id: string;
        name: string;
        reliability: number;
        brand: string;
        model: string;
        ram: number;
        cuda_cores: number;
        is_active: boolean;
        is_ordered: boolean;
      };
      motherboard: {
        id: string;
        ram: number;
        cpu_cores: number;
        cpu_model: string;
        gpu_motherboard_id: string;
      };
    };
    plan: {
      id: string;
      additional_price: '0.00';
      name: string;
      ide: string;
      libraries: string;
      utilities: string;
      max_continuous_usage_hours: number;
    };
    disk: {
      id: string;
      name: string;
      capacity: number;
      type: string;
      periodic_price: string;
      hourly_price: string;
      discount: string;
      is_public: boolean;
      is_active: boolean;
      is_ordered: boolean;
    };
  }[];
  total_count: number;
  page_count: number;
}

interface IGetPackageUsageInfoResponsePayload {
  usage_time_sum: string;
  volume_data: {
    used_percent: number;
    used_capacity: number;
    free_capacity: number;
    total_capacity: number;
  };
  free_data: {
    expire_date: string;
    total_free: number;
    remind_free: number;
  };
}

export type {
  IUserDetail,
  IGetUserInfoRequestPayload,
  IGetUserInfoResponsePayload,
  IUpdateUserInfoRequest,
  IGetUserApiPackageResponsePayload,
  IGetUserApiPackageRequestPayload,
  IUserApiPackageDetail,
  IGetUserGpuPckageResponsePayload,
  IGetPackageUsageInfoResponsePayload,
};
