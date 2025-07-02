import { useQuery } from '@tanstack/react-query';
import FaqCategoryService from './faq.service';
import {
  IGetFaqCategoryListRequestPayload,
  IGetFaqCategoryListResponsePayload,
  IFaqCategory,
} from './interface';

const faqCategoryService = new FaqCategoryService();

export const useGetFaqCategoryList = (
  params: Partial<IGetFaqCategoryListRequestPayload> = {}
) => {
  const query = useQuery<
    IGetFaqCategoryListResponsePayload,
    Error,
    IFaqCategory[]
  >({
    queryKey: ['faqCategoryList', params],
    queryFn: () =>
      faqCategoryService.getFaqCategoryList(params).then((res) => res.data),
    select: (payload) => payload.results,
    keepPreviousData: true,
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
