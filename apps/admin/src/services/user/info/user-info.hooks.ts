import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import UserInfoServices from './user-info.service';
import type {
  IGetUserApiPackageRequestPayload,
  IGetUserInfoRequestPayload,
  IUpdateUserInfoRequest,
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

  const query = useQuery({
    queryKey: [`useGetUserApiPackage`, allQueryParams, id],
    queryFn: async ({ queryKey }) => {
      const { page_size, tab, ...params } =
        queryKey[1] as IGetUserApiPackageRequestPayload;
      const queryParams = {
        ...params,
        page_size: page_size || 10,
      };
      const response = await userInfoServices.getUserApiPackages(
        id,
        queryParams
      );
      return response;
    },
    placeholderData: keepPreviousData,
  });
  return query;
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
