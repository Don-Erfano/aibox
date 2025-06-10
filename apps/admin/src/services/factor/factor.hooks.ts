import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';
import { showNotification } from '@/utils/notifications';

import { FactorServices } from './factor.service';
import {
  IAddFactor,
  IFactor,
  IGetFactorsParams,
  IGetFactorsResponse,
} from './interface';

const factorServices = new FactorServices();

export const usePostFactor = () =>
  useMutation({
    mutationFn: (data: IAddFactor) => factorServices.postFactor(data),
    onSuccess: () => {
      showNotification({
        message: 'فاکتور جدید با موفقیت ایجاد شد.',
        type: 'success',
      });
    },
    mutationKey: [`postFactor`],
  });

export const useDeleteFactor = () =>
  useMutation({
    mutationFn: (id: string) => factorServices.deleteFactor(id),
    onSuccess: () => {
      showNotification({
        message: 'فاکتور با موفقیت حذف شد.',
        type: 'success',
      });
    },
    mutationKey: [`deleteFactor`],
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
