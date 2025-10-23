import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import { GpusServices } from "./gpus.service";
import { useQueryParams } from "@/hooks/useQueryParams";
import {
  IGpu,
  IGpusListRequestPayload,
  IGpusListResponsePayload,
  IPostGpuRequestPayload,
} from "./interface";

const gpusServices = new GpusServices();

const useGetGpusList = () => {
  const allQueryParams = useQueryParams();
  let totalPages = 0;
  let totalItems = 0;
  const {
    data: gpus = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGpusListResponsePayload, Error, IGpu[]>({
    queryKey: ["useGetGpusList", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } = queryKey[1] as IGpusListRequestPayload;
      const queryParams: IGpusListRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };
      const response = await gpusServices.getGpusList(queryParams);
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
    gpus,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useGetAllGpusList = () =>
  useQuery({
    queryKey: ["useGetAllGpusList"],
    queryFn: () => gpusServices.getGpusList(),
  });

const useDeleteGpu = () =>
  useMutation({
    mutationKey: ["useDeleteGpu"],
    mutationFn: async (id?: string) => await gpusServices.deleteGpu(id),
  });

const useGetGpuInfo = (id?: string) =>
  useQuery({
    queryFn: async () => await gpusServices.getGpuInfo(id),
    queryKey: ["useGetGpuInfo", id],
    enabled: !!id,
    gcTime: 0,
  });

const usePostGpu = () =>
  useMutation({
    mutationFn: async (data: IPostGpuRequestPayload) =>
      await gpusServices.postGpu(data),
    mutationKey: ["usePostGpu"],
  });
const usePutGpu = () =>
  useMutation({
    mutationFn: async ({
      data,
      id,
    }: {
      data: IPostGpuRequestPayload;
      id: string;
    }) => await gpusServices.putGpu(data, id),
    mutationKey: ["usePostGpu"],
  });

export {
  useGetGpusList,
  useDeleteGpu,
  useGetGpuInfo,
  usePostGpu,
  usePutGpu,
  useGetAllGpusList,
};
