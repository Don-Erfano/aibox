import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { useQueryParams } from '@/hooks/useQueryParams';

import { GiftCodeServices } from './gift-code.service';
import {
  GetGiftCodesParams,
  GiftCode,
  IGetGiftCodesReponse,
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
      const { page, ...params } = queryKey[1] as GetGiftCodesParams;
      const queryParams: GetGiftCodesParams = { page: page, ...params };

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
