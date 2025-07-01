import NewsService from './news.service';
import { useQuery } from '@tanstack/react-query';
import { IGetNewsTags, IGetNewsTagsRequest, INewsTags } from './interface';

const newsService = new NewsService();

export const useGetNewsTags = () => {
  const { data: newsTags = [], isPending } = useQuery<
    IGetNewsTags,
    Error,
    INewsTags[]
  >({
    queryKey: ['newsTags'],
    queryFn: async () => {
      const params: IGetNewsTagsRequest = {
        page_size: 50,
      };
      const resp = await newsService.getNewsTags(params);
      return resp.data.data;
    },
  });

  return { newsTags, isPending };
};
