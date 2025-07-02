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
  id: '2c7be942-0278-4f79-96ba-08768d41a0d2';
  payment_type: 'ساعتی';
  hourly_price: '0';
  remaining_time: '-';
  remaining_disk_volume: '-';
  gpu_motherboard: {
    id: '6a95c78f-256f-4398-a52d-370fc1e71ffa';
    gpu: {
      id: 'a6be7d99-5015-4b53-b693-86fa49dea154';
      name: 'GeForce GT 1030';
      reliability: 100;
      brand: 'GeForce';
      model: '1030';
      ram: 2;
      cuda_cores: 384;
      is_active: true;
      is_ordered: false;
    };
    motherboard: {
      id: '72c52f66-6a59-4141-8c25-858fb5622419';
      ram: 8;
      cpu_cores: 4;
      cpu_model: 'intel';
      gpu_motherboard_id: '';
    };
  };
  plan: {
    id: '8b4f7fe9-931f-4674-86d9-a76ab095bc30';
    additional_price: '0.00';
    name: 'پایه';
    ide: 'jupyter notebook';
    libraries: 'TensorFlow, Transformers, Torch, CudaToolkit, LapackForCuda, Quanto, Lammps, Pandas,PyTorch,Keras, Matplotlib, Scikit-Learn';
    utilities: 'RAR-ZIP';
    max_continuous_usage_hours: 0;
  };
  disk: {
    id: 'a4ba983f-2960-46ed-8633-f3628c25ad23';
    name: 'disk 1';
    capacity: 10;
    type: 'HDD';
    periodic_price: '0.000000';
    hourly_price: '0.00';
    discount: '0.05';
    is_public: false;
    is_active: false;
    is_ordered: false;
  };
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
