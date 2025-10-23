import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";

import { useQueryParams } from "@/hooks/useQueryParams";

import { MotherboardServices } from "./motherboard.service";
import {
  IGetMotherboardResponsePayload,
  IGetMotherboardsListRequestPayload,
  IMotherboard,
} from "./interface";

const motherboardServices = new MotherboardServices();

const useGetMotherboardsList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: motherboards = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetMotherboardResponsePayload, Error, IMotherboard[]>({
    queryKey: ["motherboards", allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page_size, ...params } =
        queryKey[1] as IGetMotherboardsListRequestPayload;
      const queryParams: IGetMotherboardsListRequestPayload = {
        ...params,
        page_size: page_size || 10,
      };

      const response =
        await motherboardServices.getmotherboardsList(queryParams);
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
    motherboards,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

const useGetAllMotherboardsList = () =>
  useQuery({
    queryKey: ["useGetAllGpusList"],
    queryFn: () => motherboardServices.getmotherboardsList(),
  });

const useDeleteMotherboard = () =>
  useMutation({
    mutationFn: (id?: string) => motherboardServices.deleteMotherboard(id),
    mutationKey: ["useDeleteMotherboard"],
  });

const useGetMotherboardInfo = (id?: string) =>
  useQuery({
    queryKey: ["useGetMotherboardInfo", id],
    queryFn: async () => await motherboardServices.getMotherboardInfo(id),
    enabled: !!id,
    gcTime: 0,
  });

const usePutMotherboard = () =>
  useMutation({
    mutationFn: async ({ data, id }: any) =>
      await motherboardServices.putMotherboard(data, id),
    mutationKey: ["usePutMotherboard"],
  });
const usePostMotherboard = () =>
  useMutation({
    mutationFn: async (data) => await motherboardServices.postMotherboard(data),
    mutationKey: ["usePostMotherboard"],
  });

export {
  usePutMotherboard,
  usePostMotherboard,
  useDeleteMotherboard,
  useGetMotherboardInfo,
  useGetMotherboardsList,
  useGetAllMotherboardsList,
};
