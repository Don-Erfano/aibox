import { useQuery } from '@tanstack/react-query';
import CategoryService from './category-list.service';
import { ICategory } from './interface';

const categoryService = new CategoryService();

export const useGetCategories = () => {
  const {
    data: categories = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<ICategory[], Error>({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await categoryService.getCategories();
      return response.data.data.category;
    },
    placeholderData: [],
  });

  return {
    categories,
    isLoading,
    isFetching,
    refetch,
  };
};
