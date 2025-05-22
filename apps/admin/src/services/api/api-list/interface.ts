import { IPaginationMeta } from '@aibox/services';

interface IApiDetails {
  id: string;
  created_at: string;
  updated_at: string;
  version: string;
  status: string;
  api: {
    id: string;
    name: string;
    user: {
      id: string;
      nick_name: string;
      role: string;
      email: string;
      profile_picture: string;
    };
  };
  status_date: string;
  requests: number;
  enroll: number;
  is_public: boolean;
}

interface IGetApiListResponsePayload extends IPaginationMeta {
  list: IApiDetails[];
}

interface IGetApiListRequestPayload {
  requests__lte: number;
  requests__gte: number;
  enroll__lte: number;
  enroll__gte: number;
  status:
    | 'PROCESSING'
    | 'ACCEPTED'
    | 'DEPRECATED'
    | 'WAITING_DEPRECATE'
    | 'WAITING';
  status_date__gte: string;
  status_date__lte: string;
  name: string;
  user: string;
  page_size: number;
  page: number;
  search: string;
  ordering: string;
}

export type {
  IGetApiListResponsePayload,
  IGetApiListRequestPayload,
  IApiDetails,
};
