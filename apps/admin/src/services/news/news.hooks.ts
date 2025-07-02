import { useRouter } from 'next/navigation';
import { useQueryParams } from '@/hooks/useQueryParams';
import { keepPreviousData, useMutation, useQuery } from '@tanstack/react-query';
import {
  INews,
  IGetNewsListResponse,
  IGetNewsListRequest,
  IAddNewsRequestPayload,
} from './interface';
import { NEWS_ROUTES } from '@/routes';
import NewsService from './news.service';
import { toast } from '@aibox/ui';
import { showNotification } from '@/utils/notifications';

const newsService = new NewsService();

export const useGetNewsList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: news = [],
    isLoading,
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
      return payload.results;
    },
    placeholderData: keepPreviousData,
  });

  return { news, totalItems, totalPages, isLoading, refetch };
};

export const useGetNews = (id: string) =>
  useQuery({
    queryKey: ['news', id],
    queryFn: async () => {
      const rep = await newsService.getNewsById(id);
      return rep.data.data;
    },
    enabled: !!id,
  });

export const useCreateNews = () => {
  const router = useRouter();
  return useMutation<IGetNewsListResponse, Error, IAddNewsRequestPayload>({
    mutationFn: (newUserPayload: IAddNewsRequestPayload) =>
      newsService.addNews(newUserPayload).then((res) => res.data.data),
    onSuccess: () => {
      router.push(NEWS_ROUTES.LIST);
    },
  });
};

export const usePutNewsById = () => {
  return useMutation({
    mutationKey: ['putNewsById'],
    mutationFn: (data: IAddNewsRequestPayload) => newsService.updateNews(data),
    onSuccess: () => {
      toast.success('خبر مورد نظر با موفقیت ویرایش شد.');
    },
  });
};

export const useDeleteNews = () =>
  useMutation({
    mutationFn: (id: number) => newsService.deleteNews(id),
    onSuccess: () => {
      toast.success('خبر مورد نظر با موفقیت حذف شد.');
    },
    mutationKey: [`deleteNews`],
  });
