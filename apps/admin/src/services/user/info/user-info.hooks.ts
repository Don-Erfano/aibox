import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import UserInfoServices from './user-info.service';
import type {
  IGetUserApiPackageRequestPayload,
  IGetUserApiPackageResponsePayload,
  IGetUserInfoRequestPayload,
  IUpdateUserInfoRequest,
  IUserApiPackageDetail,
} from './interface';
import { useQueryParams } from '@/hooks/useQueryParams';

const userInfoServices = new UserInfoServices();

export const useGetUserInfo = ({ id }: IGetUserInfoRequestPayload) => {
  const { data: user = undefined, isPending } = useQuery({
    queryKey: ['userInfo', id],
    queryFn: async () => {
      const response = await userInfoServices.getUserInfo({ id });
      return response.data.data;
    },
    enabled: !!id,
  });

  return { user, isPending };
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }: IUpdateUserInfoRequest) => {
      return await userInfoServices.UpdateUserInfo({ id, ...body });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['userInfo', variables.id],
      });
    },
  });
};

export const useGetUserApiPackage = (id: string) => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: packages = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<
    IGetUserApiPackageResponsePayload,
    Error,
    IUserApiPackageDetail[]
  >({
    queryKey: ['useGetApisLogs', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as IGetUserApiPackageRequestPayload;
      const queryParams: IGetUserApiPackageRequestPayload = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await userInfoServices.getUserApiPackages(
        id,
        queryParams
      );
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.list;
    },
    placeholderData: keepPreviousData,
  });

  return {
    packages,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useGetUserGpuPackage = (id: string) =>
  useQuery({
    queryFn: async () => await userInfoServices.getUserGpuPackages(id),
    queryKey: ['useGetUserGpuPackage'],
  });

export const useGetUserGpuPackageInfo = (id: string) =>
  useQuery({
    queryFn: async () => await userInfoServices.getUserGpuPackageInfo(id),
    queryKey: ['useGetUserGpuPackageInfo'],
  });
