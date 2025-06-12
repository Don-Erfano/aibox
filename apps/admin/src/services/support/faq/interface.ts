import { IPaginationMeta } from '@aibox/services';

export interface IFaqItem {
  id: string;
  question: string;
  answer: string;
  category_id: string;
  priority?: number;
}
export interface IFaqCategory {
  id: string;
  name: string;
  priority?: number;
  faqs: IFaqItem[];
}

export interface IGetFaqCategoryListRequestPayload {
  ordering?: string;
  page?: number;
  page_size?: number;
  search?: string;
}

export interface IGetFaqCategoryListResponsePayload extends IPaginationMeta {
  results: IFaqCategory[];
}
