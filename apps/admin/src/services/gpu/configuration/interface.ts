interface IConfiguration {
  id: string;
  gpu: string;
  cpu: string;
  motherboard: string;
  hourly_price: string;
  is_active: boolean;
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
