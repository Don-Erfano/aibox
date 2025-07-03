import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import { useQueryParams } from '@/hooks/useQueryParams';

import { ConfigurationServices } from './configuration.service';
import {
  IAddNewConfigurationRequestPayload,
  IConfiguration,
  IConfigurationRequestPayload,
  IConfigurationResponsePayload,
} from './interface';

const configurationServices = new ConfigurationServices();

export const useGetConfigurationData = () => {
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

export const useGetgpuList = () =>
  useQuery({
    queryFn: async () => await configurationServices.getGpuList(),
    queryKey: ['useGetgpuList'],
  });

export const useGetMotherboardList = () =>
  useQuery({
    queryFn: async () => await configurationServices.getMotherboardList(),
    queryKey: ['useGetMotherboardList'],
  });

export const usePostConfiguration = () =>
  useMutation({
    mutationKey: [`usePostConfiguration`],
    mutationFn: async (data: IAddNewConfigurationRequestPayload) =>
      await configurationServices.addNewConfiguration(data),
  });

export const usePutConfiguration = () =>
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

export const useGetConfigurationById = (id?: string) =>
  useQuery({
    queryFn: async () => await configurationServices.getConfigurationData(id),
    enabled: !!id,
    queryKey: [id, 'useGetConfigurationById'],
  });
