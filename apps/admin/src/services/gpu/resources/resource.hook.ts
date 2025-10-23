import { keepPreviousData, useQuery } from '@tanstack/react-query';

import {
  IGetNodesRequestPayload,
  IGetNodesResponsePayload,
  INode,
  IResourceDetailRequestPayload,
  IResourceDetailResponsePayload,
} from './interface';
import { ResourceServices } from './resources.service';
import { useQueryParams } from '@/hooks/useQueryParams';

const resourceServices = new ResourceServices();

const useGetResources = () =>
  useQuery({
    queryFn: async () => await resourceServices.getResources(),
    queryKey: ['useGetResources'],
    select: (data) => data.data.data.resources,
  });

const useGetResourceDetail = ({ scope }: { scope: string }) => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: resourceDetail = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<
    IResourceDetailResponsePayload,
    Error,
    IResourceDetailResponsePayload
  >({
    queryKey: ['useGetResourceDetail', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } =
        queryKey[1] as IResourceDetailRequestPayload;
      const queryParams: IResourceDetailRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };

      const response = await resourceServices.getResourceDetail({
        params: queryParams,
        scope,
      });
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload;
    },
    placeholderData: keepPreviousData,
  });

  return {
    resourceDetail,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useGetNodes = ({
  scope,
  profile,
}: {
  scope: string;
  profile: string;
}) => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: nodes = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetNodesResponsePayload, Error, INode[]>({
    queryKey: ['useGetNodes', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[1] as IGetNodesRequestPayload;
      const queryParams: IGetNodesRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };

      const response = await resourceServices.getNodes({
        params: queryParams,
        scope,
        profile,
      });
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.nodes;
    },
    placeholderData: keepPreviousData,
  });

  return {
    nodes,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export { useGetResources, useGetResourceDetail, useGetNodes };
