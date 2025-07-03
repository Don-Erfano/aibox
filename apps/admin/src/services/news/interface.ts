import { IPaginationMeta } from '@aibox/services';

export interface Tag {
  id: string;
  name: string;
}
export interface INews {
  id: number;
  title: string;
  content: string;
  summary: string;
  slug: string;
  tags: Tag[];
  created_at: string;
  thumbnail: File;
}

// get news list
export interface IGetNewsListRequest {
  title?: string;
  description: string;
  created_at__lte?: string;
  created_at__gte?: string;
  page?: number;
  page_size?: number;
  ordering?: string;
  search?: string;
}

export interface IGetNewsListResponse extends IPaginationMeta {
  results: INews[];
}

export interface IAddNewsRequestPayload {
  id?: string;
  title: string;
  content: string;
  thumbnail?: string;
  tags?: string[];
  summary: string;
  slug: string;
}
