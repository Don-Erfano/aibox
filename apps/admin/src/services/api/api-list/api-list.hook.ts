import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

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
      const { page, page_size, ...params } =
        queryKey[1] as IGetApiListRequestPayload;
      const queryParams: IGetApiListRequestPayload = {
        page,
        ...params,
        page_size: page_size || 10,
      };
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

const usePostApproveApi = () =>
  useMutation({
    mutationFn: async (id: string) => await apiListService.approveApi(id),
    mutationKey: ['usePostApproveApi'],
  });

const usePostResolveProxyError = () =>
  useMutation({
    mutationFn: async (id: string) =>
      await apiListService.resolveProxyError(id),
    mutationKey: ['usePostResolveProxyError'],
  });

const usePostRejectApi = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: { title: string; description: string };
    }) => await apiListService.rejectApi(id, data),
    mutationKey: ['usePostResolveProxyError'],
  });

const usePostDeprecatetApi = () =>
  useMutation({
    mutationFn: async (id: string) => await apiListService.deprecate(id),
    mutationKey: ['usePostResolveProxyError'],
  });

export {
  useGetApiList,
  usePostApproveApi,
  usePostResolveProxyError,
  usePostRejectApi,
  usePostDeprecatetApi,
};
