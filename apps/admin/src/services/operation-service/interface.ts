import { IPaginationMeta } from '@aibox/services';

export interface IDeploymentResult {
  deployment_name: string;
  image: string;
  port: number;
  service_url: string;
  websocket_name: string;
  status: 'RUNNING' | 'ADMIN_OFF' | string;
  user_logs: string;
  scope: string;
  label: string;
  api_name: string;
  api_image: string;
  cpu: number;
  ram: number;
  id: string;
  has_info: boolean;
  use_gpu: boolean;
  pvc_name: string;
  mount_path: string;
  is_up: boolean;
}

export interface IDeploymentRequest {
  title?: string;
  description: string;
  created_at__lte?: string;
  created_at__gte?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
}

export type IDeployPayload = {
  version: string;
};

export interface IDeploymentResponse extends IPaginationMeta {
  results: IDeploymentResult[];
}
