import { BasePackageStatus } from '../configuration';

export type MonthlyStatus =
  | 'WaitApproval'
  | 'WaitPayment'
  | 'Activating'
  | 'Active'
  | 'InActive';

export type LogStatus = 'Canceled' | 'Active';

export type ServerStatusLog =
  | 'in_queue'
  | 'ready'
  | 'starting'
  | 'running'
  | 'assign_volume'
  | 'stopped'
  | 'expired'
  | 'system_error'
  | 'admin_stopped'
  | 'admin_cancel'
  | 'cancel';

interface IGetLogsListRequestPayload {
  user_id: string;
  gpu_motherboard_id: string;
  status: string;
  activated_at__lte: string;
  activated_at__gte: string;
  usage_time__gte: number;
  usage_time__lte: number;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface IGpuLog {
  id: string;
  email: string;
  status?: LogStatus;
  usage_time: number;
  activated_at: string;
  package_name: string;
  profile_picture: string;
  user_id: string;
  payment_type: BasePackageStatus;
  monthly_status?: MonthlyStatus;
  server_status?: ServerStatusLog;
  factor_num?: string;
}

interface IGetLogsListResponsePayload {
  packages: IGpuLog[];
  count: number;
  page_count: number;
}

interface IGetPackageByIdResponsePayload {
  id: string;
  user_id: string;
  gpu_motherboard_id: string;
  disk_id: string;
  plan_id: string;
  payment_type: string;
  status: string;
  email: string;
  package_name: string;
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
      available: string;
      free_number: string;
      in_queue: string;
      free_hour: number;
      free_days: number;
      is_ordered: boolean;
    };
    motherboard: {
      id: string;
      ram: boolean;
      cpu_cores: boolean;
      cpu_model: string;
      name: string;
      gpu_motherboard_id: string;
    };
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
  plan: {
    id: string;
    additional_price: string;
    name: string;
    ide: string;
    libraries: string;
    utilities: string;
    max_continuous_usage_hours: number;
  };
  facture: {
    min_required_charge: string;
    hourly_price_with_tax: string;
  };
}

interface IUpdatePackageRequestPayload {
  gpu_motherboard_id: string;
  disk_id: string;
  status: string;
  plan_id: string;
}

interface IPlanResponsePayload {
  results: {
    additional_price: string;
    id: string;
    ide: string;
    libraries: string;
    max_continuous_usage_hours: number;
    name: string;
    utilities: string;
  }[];
}

interface IDiskResponsePayload {
  results: {
    id: string;
    name: string;
    capacity: number;
    type: string;
    discount: number;
    updated_at: string;
    created_at: string;
    hourly_price: number;
  }[];
}

export type {
  IGpuLog,
  IGetLogsListRequestPayload,
  IGetLogsListResponsePayload,
  IUpdatePackageRequestPayload,
  IGetPackageByIdResponsePayload,
  IPlanResponsePayload,
  IDiskResponsePayload,
};
