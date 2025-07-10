import {
  useQuery,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import TicketingCategoryService from './ticketing-category.service';
import {
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
    queryKey: ['ticketingCategory', params],
    queryFn: () =>
      ticketingCategoryService.getCategoryList(params).then((r) => r.data.data),
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
