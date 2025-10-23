import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { useQueryParams } from '@/hooks/useQueryParams';

import { ConfigurationServices } from './configuration.service';
import {
  ApprovalReportParams,
  IAddNewConfigurationRequestPayload,
  IConfiguration,
  IConfigurationRequestPayload,
  IConfigurationResponsePayload,
} from './interface';
import { toast } from '@aibox/ui';

const configurationServices = new ConfigurationServices();

const useGetConfigurationData = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: configs = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IConfigurationResponsePayload, Error, IConfiguration[]>({
    queryKey: ['configs', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IConfigurationRequestPayload;
      const queryParams: IConfigurationRequestPayload = {
        page: page,
        ...params,
      };

      const response = await configurationServices.getConfigurationList(
        queryParams
      );
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.count;
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return {
    configs,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useGetAllPackages = () =>
  useQuery({
    queryFn: async () => await configurationServices.getConfigurationList(),
    queryKey: ['useGetAllPackages'],
  });

const useGetMotherboardList = () =>
  useQuery({
    queryFn: async () => await configurationServices.getMotherboardList(),
    queryKey: ['useGetMotherboardList'],
  });

const usePostConfiguration = () =>
  useMutation({
    mutationKey: [`usePostConfiguration`],
    mutationFn: async (data: IAddNewConfigurationRequestPayload) =>
      await configurationServices.addNewConfiguration(data),
  });

const usePutConfiguration = () =>
  useMutation({
    mutationKey: [`usePutConfiguration`],
    mutationFn: async ({
      data,
      id,
    }: {
      data: IAddNewConfigurationRequestPayload;
      id?: string;
    }) => await configurationServices.editConfiguration(data, id),
  });

const useGetConfigurationById = (id?: string) =>
  useQuery({
    queryFn: async () => await configurationServices.getConfigurationData(id),
    queryKey: [id, 'useGetConfigurationById'],
    enabled: !!id,
    gcTime: 0,
  });

const useDeleteConfiguration = () =>
  useMutation({
    mutationFn: async (id?: string) =>
      await configurationServices.deleteConfiguration(id),
    mutationKey: ['deleteConfiguration'],
  });

const useApporvePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ApprovalReportParams) =>
      configurationServices.approvePackage(data),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['useGetGpuLogsList'] });
      const isApproved = data.data.monthly_status === 'WaitPayment';
      toast.success(`بسته کاربر با موفقیت ${isApproved ? 'تأیید' : 'رد'} شد.`);
    },
  });
};

const useActivatePackage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => configurationServices.activatePackage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['useGetGpuLogsList'] });
      toast.success('فعال‌سازی مجدد با موفقیت انجام شد.');
    },
  });
};

const useGetAllGpuMotherboards = () =>
  useQuery({
    queryKey: ['allGpuMotherboards'],
    queryFn: () => configurationServices.getAllGpuMotherboards(),
    select: ({ data }) => data.data.gpu_motherboard,
  });

export {
  usePutConfiguration,
  usePostConfiguration,
  useGetMotherboardList,
  useDeleteConfiguration,
  useGetConfigurationData,
  useGetConfigurationById,
  useGetAllPackages,
  useApporvePackage,
  useActivatePackage,
  useGetAllGpuMotherboards,
};
