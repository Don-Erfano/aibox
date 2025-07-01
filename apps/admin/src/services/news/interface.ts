import { IPaginationMeta } from '@aibox/services';

export interface INews {
  id: string;
  title: string;
  description: string;
  created_at: string;
}

// get ticketing list
export interface IGetNewsListRequest {
  title?: string;
  description: string;
  created_at__lte?: string;
  created_at__gte?: string;
  page_size?: number;
  page_number?: number;
  ordering?: string;
  search?: string;
}

export interface IGetNewsListResponse extends IPaginationMeta {
  data: INews[];
}
