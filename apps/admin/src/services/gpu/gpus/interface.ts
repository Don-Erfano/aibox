interface IGpu {
  id: string;
  name: string;
  reliability: number;
  brand: string;
  model: string;
  ram: number;
  cuda_cores: number;
  is_active: boolean;
  is_ordered: boolean;
  free_hour: number;
  free_days: number;
}

interface IGpusListResponsePayload {
  results: IGpu[];
  count: number;
  page_count: number;
}

interface IGpusListRequestPayload {
  ram__gte: number;
  ram__lte: number;
  cuda_cores__gte: number;
  cuda_cores__lte: number;
  reliability__gte: number;
  reliability__lte: number;
  free_hour__gte: number;
  free_hour__lte: number;
  free_days__gte: number;
  free_days__lte: number;
  model: string;
  brand: string;
  is_active: boolean;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

type IDeleteGpusResponsePayload = object;

interface IPostGpuRequestPayload {
  cuda_cores: number;
  brand: string;
  model: string;
  ram: number;
  reliability: number;
  is_active: boolean;
  free_hour?: number;
  free_days?: number;
}

export type {
  IGpu,
  IPostGpuRequestPayload,
  IGpusListRequestPayload,
  IGpusListResponsePayload,
  IDeleteGpusResponsePayload,
};
