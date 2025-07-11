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
      faqCategoryService
        .getFaqCategoryList(params)
        .then((res) => res.data) as any,
    select: (payload) => payload.results,
  });

  return {
    categories: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
