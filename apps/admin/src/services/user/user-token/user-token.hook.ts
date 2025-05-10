import { useQuery } from '@tanstack/react-query';
import {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';
import { INetworkResponse } from '@aibox/services';
import UserAccessTokenListService from '@/services/user/user-token/user-token.service';

const userAccessTokenServices = new UserAccessTokenListService();

export const useGetAccessTokenList = (params: IGetUserListRequestPayload) => {
  const query = useQuery<INetworkResponse<IGetUserListResponsePayload>, Error>({
    queryKey: ['useGetAccessTokenList', params],
    queryFn: () =>
      userAccessTokenServices
        .getAccessTokenList(params)
        .then((res) => res.data),
  });

  const page = query.data?.data.page_count ?? 0;
  const total = query.data?.data.total_count ?? 0;

  return {
    ...query,
    users: query.data?.data.user ?? [],
    page,
    total,
  };
};
