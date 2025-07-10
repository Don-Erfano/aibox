import { useQuery } from '@tanstack/react-query';
import { ITitle } from './interface';
import MessageTitleService from './message-title.service';

const categoryService = new MessageTitleService();

export const useGetMessageTitle = () => {
  const {
    data: titles = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ITitle[], Error>({
    queryKey: ['titles'],
    queryFn: async () => {
      const response = await categoryService.getMessageTitle();
      return response.data.data.title;
    },
    placeholderData: [],
  });

  return {
    titles,
    isLoading,
    isFetching,
    refetch,
  };
};
