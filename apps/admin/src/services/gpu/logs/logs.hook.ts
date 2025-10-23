import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks/useQueryParams";

import {
  IGetLogsListResponsePayload,
  IGetLogsListRequestPayload,
  IGpuLog,
  IUpdatePackageRequestPayload,
} from "./interface";
import { GpuLogsService } from "./logs.service";

const gpuLogServices = new GpuLogsService();

const useGetGpuLogsList = () => {
  const allQueryParams = useQueryParams();
  let totalPages = 0;
  let totalItems = 0;
  const {
    data: logs = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetLogsListResponsePayload, Error, IGpuLog[]>({
    queryKey: ["useGetGpuLogsList", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } =
        queryKey[1] as IGetLogsListRequestPayload;
      const queryParams: IGetLogsListRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };
      const response = await gpuLogServices.getGpuLogsList(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.count;
      return payload.packages;
    },
    placeholderData: keepPreviousData,
  });
  return {
    logs,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useDeleteGpuLog = () =>
  useMutation({
    mutationFn: async (id: string) => await gpuLogServices.deleteGpuLog(id),
    mutationKey: ["useDeleteGpuLog"],
  });

const useUpdateUserPackage = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IUpdatePackageRequestPayload;
    }) => await gpuLogServices.updateUserPackage({ id, data }),
    mutationKey: ["useUpdateUserPackage"],
  });

const useGetPackageById = (id: string) =>
  useQuery({
    queryKey: [id, "useGetPackageById"],
    queryFn: async () => await gpuLogServices.getGpuPackageById(id),
    gcTime: 0,
  });

const useGetPlansList = () =>
  useQuery({
    queryKey: ["useGetPlansList"],
    queryFn: async () => await gpuLogServices.getPlansList(),
    select: (data) => data.data.data.results,
  });

const useGetDisksList = () =>
  useQuery({
    queryKey: ["useGetDisksList"],
    queryFn: async () => await gpuLogServices.getDisksList(),
    select: (data) => data.data.data.results,
  });

const useGetServerProfiles = () =>
  useQuery({
    queryKey: ["useGetServerProfiles"],
    queryFn: async () => await gpuLogServices.getServerProfiles(),
    select: (data) => data.data.data.profiles,
  });

export {
  useGetGpuLogsList,
  useDeleteGpuLog,
  useGetPackageById,
  useGetPlansList,
  useGetDisksList,
  useGetServerProfiles,
  useUpdateUserPackage,
};
