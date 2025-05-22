import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useQueryParams } from '@/hooks/useQueryParams';
import UserAccessTokenListService from '@/services/user/user-token/user-token.service';
import {
  IGetUserTokenRequestPayload,
  IGetUserTokenResponsePayload,
  IUserToken,
} from './interface';

const userAccessTokenServices = new UserAccessTokenListService();

export const useGetAccessTokenList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: user = [],
    isLoading,
    refetch,
    isFetching,
  } = useQuery<IGetUserTokenResponsePayload, Error, IUserToken[]>({
    queryKey: ['accessTokenList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IGetUserTokenRequestPayload;
      const queryParams: IGetUserTokenRequestPayload = { page, ...params };
      const response = await userAccessTokenServices.getAccessTokenList(
        queryParams
      );
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.user;
    },
    placeholderData: keepPreviousData,
  });

  return { user, totalItems, totalPages, isLoading, refetch, isFetching };
};
