// get news tags list

import { IPaginationMeta } from '@aibox/services';

export interface INewsTags {
  id: string;
  name: string;
}

export interface IGetNewsTagsRequest {
  page_size: number;
}

export interface IGetNewsTags extends IPaginationMeta {
  results: INewsTags[];
}
