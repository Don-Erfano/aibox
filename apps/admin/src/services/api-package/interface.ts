import { IPaginationMeta } from '@aibox/services';

import { IUserApiPackageDetail } from '../user';

export interface UsersApiPackage {
  id: string;
  user: IUserApiPackageDetail['user'];
  package: IUserApiPackageDetail['package'];
  created_at: string;
  count_api_call: number;
  expired_date: string;
}

export interface UsersApiPackagesParams {
  user_id: string;
  api__name: string;
  version: string;
  type: string;
  name: string;
  created_at__lte: string;
  created_at__gte: string;
  expired_date__lte: string;
  expired_date__gte: string;
  count_api_call__lte: string;
  count_api_call__gte: string;
  page: number;
  page_size: number;
  search: string;
  ordering: string;
}

interface Version {
  id: string;
  version: string;
}

export interface Api {
  id: string;
  name: string;
  all_version: Version[];
}

export interface ApiResponse {
  all_api: Api[];
}

export interface UsersApiPackagesResponse extends IPaginationMeta {
  list: UsersApiPackage[];
}
