import { toast } from '@aibox/ui';
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';

import { GiftCodeServices } from './gift-code.service';
import {
  GetGiftCodesParams,
  GiftCode,
  IGetGiftCodesReponse,
  NewGiftCode,
  UpdateGiftCode,
} from './interface';

const giftCodeServices = new GiftCodeServices();

export const useGetAllGiftCodes = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: giftCodes = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetGiftCodesReponse, Error, GiftCode[]>({
    queryKey: ['giftCodes', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, page_size, ...params } = queryKey[1] as GetGiftCodesParams;
      const queryParams: GetGiftCodesParams = {
        page,
        page_size: page_size || 10,
        ...params,
      };

      const response = await giftCodeServices.getAllGiftCodes(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return { giftCodes, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useGetGiftCode = (id?: string) =>
  useQuery({
    queryKey: ['giftCode', id],
    queryFn: () => giftCodeServices.getGiftCode(id),
    enabled: !!id,
    select: (res) => res.data.data,
  });

export const useAddNewGiftCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NewGiftCode) => giftCodeServices.createNewGiftCode(data),
    mutationKey: ['addNewGiftCode'],
    onSuccess: () => {
      toast.success('کد هدیه جدید با موفقیت ایجاد شد.');
      queryClient.invalidateQueries({ queryKey: ['giftCodes'] });
    },
  });
};

export const useUpdateGiftCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGiftCode) => giftCodeServices.updateGiftCode(data),
    mutationKey: ['updateGiftCode'],
    onSuccess: ({ data }) => {
      toast.success('کد هدیه با موفقیت ویرایش شد.');
      queryClient.invalidateQueries({ queryKey: ['giftCode', data.data.id] });
      queryClient.invalidateQueries({ queryKey: ['giftCodes'] });
    },
  });
};

export const useDeleteGiftCode = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => giftCodeServices.deleteGiftCode(id),
    mutationKey: ['deleteGiftCode'],
    onSuccess: () => {
      toast.success('کد هدیه با موفقیت حذف شد.');
      queryClient.invalidateQueries({ queryKey: ['giftCodes'] });
    },
  });
};
