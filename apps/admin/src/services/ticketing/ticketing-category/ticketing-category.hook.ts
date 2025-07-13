import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import TicketingCategoryService from './ticketing-category.service';
import {
  ICreateTicketingCategoryRequestPayload,
  IGetSingleTicketingCategoryResponsePayload,
  IGetTicketingCategoryRequestPayload,
  IGetTicketingCategoryResponsePayload,
  ITicketingCategory,
  IUpdateTicketingCategoryRequestPayload,
  RawUserApi,
} from './interface';
import { useQueryParams } from '@/hooks/useQueryParams';

const ticketingCategoryService = new TicketingCategoryService();

export const useGetTicketingCategory = () => {
  const rawParams = useQueryParams();
  const params = rawParams as IGetTicketingCategoryRequestPayload;
  const { tab, ...apiParams } = params;

  let pageCount = 0;
  let totalCount = 0;

  const {
    data: categories = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<
    IGetTicketingCategoryResponsePayload,
    Error,
    ITicketingCategory[]
  >({
    queryKey: ['ticketingCategory', apiParams],
    queryFn: () =>
      ticketingCategoryService
        .getCategoryList(apiParams)
        .then((r) => r.data.data),
    select: (payload) => {
      pageCount = payload.page_count;
      totalCount = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return { categories, pageCount, totalCount, isLoading, isFetching, refetch };
};

export const useTicketingCategoryUserApis = (
  categoryId?: string,
  userId?: string,
  apiId?: string
) => {
  const { categories } = useGetTicketingCategory();
  const category = categories.find((c) => c.id === categoryId);

  const apiQ = category?.questions.find((q) => q.key === 'api_id');
  const versionQ = category?.questions.find((q) => q.key === 'version_id');

  const {
    data: userApis = [],
    isLoading: isApisLoading,
    isFetching: isApisFetching,
  } = useQuery<RawUserApi[], Error>({
    queryKey: ['ticketingCategory', 'userApis', apiQ?.admin_api, userId],
    enabled: Boolean(apiQ && userId),
    placeholderData: [],
    queryFn: async () => {
      const url = apiQ!.admin_api.replace('{user_id}', userId!);
      const resp = await ticketingCategoryService.fetchUserApis(url);
      return resp.data.data.apis as unknown as RawUserApi[];
    },
  });

  const apiOptions = userApis.map((a) => ({
    value: a.id,
    label: a.name,
  }));

  const versionOptions = apiId
    ? (userApis.find((api) => api.id === apiId)?.all_version ?? []).map(
        (ver) => ({
          value: ver.id,
          label: ver.version,
        })
      )
    : [];

  return {
    apiQ,
    versionQ,
    apiOptions,
    isApisLoading,
    isApisFetching,
    versionOptions,
  };
};

export const useUpdateTicketingCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateTicketingCategoryRequestPayload;
    }) => ticketingCategoryService.updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketingCategory'] });
    },
  });
};

export const useCreateTicketingCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ICreateTicketingCategoryRequestPayload) =>
      ticketingCategoryService.createCategory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketingCategory'] });
    },
  });
};

export const useGetSingleTicketingCategory = (id: string) => {
  return useQuery<
    IGetSingleTicketingCategoryResponsePayload,
    Error,
    ITicketingCategory
  >({
    queryKey: ['ticketingCategory', 'single', id],
    queryFn: async () => {
      const response = await ticketingCategoryService.getSingleCategory(id);
      return response.data as unknown as IGetSingleTicketingCategoryResponsePayload;
    },
    select: (payload) => payload.data,
    enabled: Boolean(id),
  });
};

export const useDeleteTicketingCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ticketingCategoryService.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['ticketingCategory'] });
    },
  });
};
