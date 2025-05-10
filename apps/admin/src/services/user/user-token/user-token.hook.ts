import { UseQueryOptions } from '@tanstack/react-query';
import {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';
import { useQuery } from '@/hooks/useQery';
import UserAccessTokenListService from './user-token.service';

const userAccessTokenListService = new UserAccessTokenListService();

export function useGetUserAccessTokenList(
  params: IGetUserListRequestPayload,
  options?: UseQueryOptions<IGetUserListResponsePayload>
) {
  return useQuery(
    ['getUserAccessTokenList', params] as const,
    async () => {
      const resp = await userAccessTokenListService.getAccessTokenList(params);
      return resp.data.data;
    },
    options
  );
}
