import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';

import {
  IApiDetails,
  IGetApiListRequestPayload,
  IGetApiListResponsePayload,
} from './interface';
import ApiListServices from './api-list.service';

const apiListService = new ApiListServices();

const useGetApiList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: apis = [],
    isLoading,
    refetch,
  } = useQuery<IGetApiListResponsePayload, Error, IApiDetails[]>({
    queryKey: ['apiList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IGetApiListRequestPayload;
      const queryParams: IGetApiListRequestPayload = { page, ...params };
      const response = await apiListService.getApiList(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.list;
    },
    placeholderData: keepPreviousData,
  });

  return { apis, totalItems, totalPages, isLoading, refetch };
};

export { useGetApiList };
