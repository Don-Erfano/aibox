import { MonthlyStatus } from "../logs";

export type BasePackageStatus = "ALL" | "MONTHLY" | "HOURLY";
export type ServerStatus =
  | "none"
  | "in_queue"
  | "ready"
  | "starting"
  | "running"
  | "assign_volume"
  | "stopped"
  | "expired";
interface IConfiguration {
  id: string;
  gpu: string;
  cpu: string;
  motherboard: string;
  hourly_price: number;
  is_active: boolean;
  discount: number;
  discount_monthly: number;
  price_monthly: number;
  base_package_status: BasePackageStatus;
  server_status: ServerStatus;
}

interface IConfigurationResponsePayload {
  results: IConfiguration[];
  count: number;
  page_count: number;
}

interface IConfigurationRequestPayload {
  gpu_id: string;
  motherboard_id: string;
  hourly_price_gte: string;
  hourly_price_lte: string;
  isActive: boolean;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface IGpuListResponsePayload {
  list_detail: {
    id: string;
    dsc: string;
  }[];
}

interface IMotherboardListResponsePayload {
  list_detail: {
    id: string;
    dsc: string;
  }[];
}

interface IAddNewConfigurationRequestPayload {
  gpu_id: string;
  motherboard_id: string;
  hourly_price: number;
  is_active: boolean;
  discount: number;
}

export type {
  IConfiguration,
  IGpuListResponsePayload,
  IConfigurationResponsePayload,
  IConfigurationRequestPayload,
  IMotherboardListResponsePayload,
  IAddNewConfigurationRequestPayload,
};

export interface ApprovalReportPayload {
  is_approved: boolean;
  message?: string;
}

export interface ApprovalReportParams {
  id: string;
  data: ApprovalReportPayload;
}

export interface ApprovalReportResponse {
  monthly_status: MonthlyStatus;
}

export interface GpuMotherboard {
  id: string;
  name: string;
}

export interface GpuMotherboardResponse {
  gpu_motherboard: GpuMotherboard[];
}
