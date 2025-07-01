import NewsService from './news.service';
import { useQueryParams } from '@/hooks/useQueryParams';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { INews, IGetNewsListResponse, IGetNewsListRequest } from './interface';

const newsService = new NewsService();

export const useGetNewsList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: news = [],
    isPending,
    refetch,
  } = useQuery<IGetNewsListResponse, Error, INews[]>({
    queryKey: ['newsList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...rest } = queryKey[1] as IGetNewsListRequest & {
        page?: number;
      };
      const params: IGetNewsListRequest = {
        page_number: page ?? 1,
        page_size: 10,
        ...rest,
      };
      const resp = await newsService.getNewsList(params);
      return resp.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return { news, totalItems, totalPages, isPending, refetch };
};
