import { keepPreviousData, useQuery } from '@tanstack/react-query';
import MassNotificationsService from './message-list.service';
import {
  IGetMassNotificationsRequestPayload,
  IGetMassNotificationsResponsePayload,
  IMassNotification,
} from './interface';
import { useQueryParams } from '@/hooks/useQueryParams';

const massNotificationsService = new MassNotificationsService();

export const useGetMassNotifications = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;

  const {
    data: notifications = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<
    IGetMassNotificationsResponsePayload,
    Error,
    IMassNotification[]
  >({
    queryKey: ['massNotifications', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } =
        queryKey[1] as IGetMassNotificationsRequestPayload;
      const queryParams: IGetMassNotificationsRequestPayload = {
        page,
        page_size: 10,
        ...params,
      };
      const response = await massNotificationsService.getMassNotifications(
        queryParams
      );
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.data;
    },
    placeholderData: keepPreviousData,
  });

  return {
    notifications,
    totalPages,
    totalItems,
    isLoading,
    isFetching,
    refetch,
  };
};
