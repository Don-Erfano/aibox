import { toast } from '@aibox/ui';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';

import { ApiPackageService } from './api-package.service';
import {
  UsersApiPackage,
  UsersApiPackagesParams,
  UsersApiPackagesResponse,
} from './interface';

const apiPackageService = new ApiPackageService();

export const useGetUsersApiPackages = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: usersApiPackages = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<UsersApiPackagesResponse, Error, UsersApiPackage[]>({
    queryKey: ['usersApiPackages', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } =
        queryKey[1] as UsersApiPackagesParams;
      const queryParams: UsersApiPackagesParams = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await apiPackageService.getAllUsersApiPackages(
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
    usersApiPackages,
    totalItems,
    totalPages,
    isLoading,
    isFetching,
    refetch,
  };
};

export const useDeleteUserPackage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['deleteUserPackage'],
    mutationFn: (ids: string[]) => apiPackageService.deleteUserPackage(ids),
    onSuccess: () => {
      toast.success('اطلاعات با موفقیت حذف شد.');
      queryClient.invalidateQueries({ queryKey: ['usersApiPackages'] });
    },
  });
};

export const useGetAllApis = () =>
  useQuery({
    queryKey: ['apis'],
    queryFn: () => apiPackageService.getAllApis(),
    select: ({ data }) => data.data.all_api,
  });
