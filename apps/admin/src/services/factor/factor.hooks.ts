import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';
import { showNotification } from '@/utils/notifications';

import { FactorServices } from './factor.service';
import {
  IAddFactor,
  IFactor,
  IGetFactorsParams,
  IGetFactorsResponse,
  IUpdateFactor,
} from './interface';
import { toast } from '@aibox/ui';

const factorServices = new FactorServices();

export const usePostFactor = () =>
  useMutation({
    mutationKey: [`postFactor`],
    mutationFn: (data: IAddFactor) => factorServices.postFactor(data),
    onSuccess: () => toast.success('فاکتور جدید با موفقیت ایجاد شد.'),
  });

export const useUpdateFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['updateFactor'],
    mutationFn: (data: IUpdateFactor) => factorServices.updateFactor(data),
    onSuccess: (res) => {
      const factorId = res.data.data.id;
      queryClient.invalidateQueries({ queryKey: ['factors'] });
      queryClient.invalidateQueries({ queryKey: ['factor', factorId] });

      toast.success('فاکتور با موفقیت ویرایش شد.');
    },
  });
};

export const useDeleteFactor = () =>
  useMutation({
    mutationKey: ['deleteFactor'],
    mutationFn: (id: string) => factorServices.deleteFactor(id),
    onSuccess: () => toast.success('فاکتور با موفقیت حذف شد.'),
  });

export const useGetFactors = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: factors = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetFactorsResponse, Error, IFactor[]>({
    queryKey: ['factors', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IGetFactorsParams;
      const queryParams: IGetFactorsParams = { page: page, ...params };

      const response = await factorServices.getAllFactors(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.factor;
    },
    placeholderData: keepPreviousData,
  });

  return { factors, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useGetFactor = (id?: string) =>
  useQuery({
    queryKey: ['factor', id],
    queryFn: () => factorServices.getFactor(id),
    enabled: !!id,
    select: (res) => res.data.data,
  });
