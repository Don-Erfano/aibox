interface IGetMotherboardsListRequestPayload {
  cpu_model: string;
  ram__gte: number;
  ram__lte: number;
  cpu_cores__gte: number;
  cpu_cores__lte: number;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface IMotherboard {
  id: string;
  cpu_model: string;
  cpu_cores: number;
  ram: number;
  name: string;
}

interface IGetMotherboardResponsePayload {
  results: IMotherboard[];
  count: number;
  page_count: number;
}

export type {
  IMotherboard,
  IGetMotherboardResponsePayload,
  IGetMotherboardsListRequestPayload,
};
