import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { ServerServices } from './servers.service';
import { toast } from '@aibox/ui';
import {
  CloudStorageSetting,
  IExitQueueRequestPayload,
  IStopServerRequestPayload,
} from './interface';
import { useQueryParams } from '@/hooks/useQueryParams';

const serverServices = new ServerServices();
const useGetErrors = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: errors = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<any, Error, any[]>({
    queryKey: ['errors', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[1] as any;
      const queryParams: any = {
        page_size: page_size || 10,
        ...params,
      };

      const response = await serverServices.getErrors(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.errors;
    },
    placeholderData: keepPreviousData,
  });

  return {
    errors,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};
const useGetServers = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: servers = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<any, Error, any[]>({
    queryKey: ['useGetServers', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[1] as any;
      const queryParams: any = {
        ...params,
        page_size: page_size || 10,
      };

      const response = await serverServices.getServers(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.servers;
    },
    placeholderData: keepPreviousData,
  });

  return {
    servers,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useExitQueue = () =>
  useMutation({
    mutationFn: async (data: IExitQueueRequestPayload) =>
      await serverServices.exitQueue(data),
    mutationKey: ['useExitQueue'],
  });

const useDownServer = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: IStopServerRequestPayload) =>
      await serverServices.downServer(data),
    mutationKey: ['useDownServer'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetGpuLogsList'] });
    },
  });
};

export const useGetCloudStorageSetting = () =>
  useQuery({
    queryKey: ['cloudStorageSetting'],
    queryFn: async () => {
      const res = await serverServices.getCloudStorageSetting();
      return res.data.data;
    },
  });

export const useUpdateCloudStorageSetting = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CloudStorageSetting) =>
      serverServices.updateCloudStorageSetting(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cloudStorageSetting'] });
      toast.success('تغییر تنظیمات با موفقیت انجام شد');
    },
  });
};

const usePostCloudStorage = (version_id?: string) =>
  useQuery({
    queryKey: ['cloudStorageInfo', version_id],
    queryFn: async () => {
      if (!version_id) return null;
      const res = await serverServices.postCloudStorage(version_id);
      return res.data.data;
    },
    enabled: Boolean(version_id),
  });

export {
  useGetErrors,
  useGetServers,
  useExitQueue,
  useDownServer,
  usePostCloudStorage,
};
