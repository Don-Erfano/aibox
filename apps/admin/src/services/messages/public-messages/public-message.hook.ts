import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import MassNotificationsService from './public-message.service';
import {
  ICreateMassNotificationRequest,
  ICreateMassNotificationResponse,
  IDeleteMassNotificationMessagePathParams,
  IDeleteMassNotificationMessageResponse,
  IGetMassNotificationByIdResponse,
  IGetMassNotificationCategoriesResponse,
  IGetMassNotificationsRequest,
  IGetMassNotificationsResponse,
  IGetMassNotificationStatusResponse,
  IMassNotification,
  IUpdateMassNotificationMessageRequest,
  IUpdateMassNotificationRequest,
} from './interface';
import { useQueryParams } from '@/hooks/useQueryParams';
import { INetworkResponse } from '@aibox/services';

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
  } = useQuery<IGetMassNotificationsResponse, Error, IMassNotification[]>({
    queryKey: ['massNotifications', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IGetMassNotificationsRequest;
      const queryParams: IGetMassNotificationsRequest = {
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

export const useCreateMassNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    INetworkResponse<ICreateMassNotificationResponse>,
    unknown,
    ICreateMassNotificationRequest
  >({
    mutationFn: async (payload: ICreateMassNotificationRequest) => {
      const response = await massNotificationsService.createMassNotification(
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
    },
  });
};

export const useGetMassNotificationCategories = () => {
  return useQuery<
    INetworkResponse<IGetMassNotificationCategoriesResponse>,
    Error,
    IGetMassNotificationCategoriesResponse
  >({
    queryKey: ['massNotificationCategories'],
    queryFn: async () => {
      const response = await massNotificationsService.getMessageCategories();
      return response.data;
    },
  });
};
export const useUpdateMassNotificationMessage = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    INetworkResponse<ICreateMassNotificationResponse>,
    unknown,
    IUpdateMassNotificationMessageRequest
  >({
    mutationFn: async (payload: IUpdateMassNotificationMessageRequest) => {
      const response =
        await massNotificationsService.updateMassNotificationMessage(
          id,
          payload
        );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
      queryClient.invalidateQueries({
        queryKey: ['massNotificationCategories'],
      });
    },
  });
};
export const useDeleteMassNotificationMessage = () => {
  const queryClient = useQueryClient();

  return useMutation<
    INetworkResponse<IDeleteMassNotificationMessageResponse>,
    unknown,
    IDeleteMassNotificationMessagePathParams
  >({
    mutationFn: async (params: IDeleteMassNotificationMessagePathParams) => {
      const response =
        await massNotificationsService.deleteMassNotificationMessage(params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
    },
  });
};

export const useGetMassNotificationStatus = () => {
  return useQuery<
    INetworkResponse<IGetMassNotificationStatusResponse>,
    Error,
    IGetMassNotificationStatusResponse
  >({
    queryKey: ['massNotificationStatus'],
    queryFn: async () => {
      const response =
        await massNotificationsService.getMassNotificationStatus();
      return response.data;
    },
    select: (data) => data.data,
  });
};

export const useUpdateMassNotification = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    INetworkResponse<unknown>,
    unknown,
    IUpdateMassNotificationRequest
  >({
    mutationFn: async (payload: IUpdateMassNotificationRequest) => {
      const response = await massNotificationsService.updateMassNotification(
        id,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
    },
  });
};

export const useDeleteMassNotification = () => {
  const queryClient = useQueryClient();

  return useMutation<
    INetworkResponse<IDeleteMassNotificationMessageResponse>,
    unknown,
    IDeleteMassNotificationMessagePathParams
  >({
    mutationFn: async (params: IDeleteMassNotificationMessagePathParams) => {
      const response =
        await massNotificationsService.deleteMassNotificationMessage(params);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['massNotifications'] });
    },
  });
};

export const useGetMassNotificationById = (id: string, enabled = true) => {
  const {
    data: massNotification,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useQuery<IGetMassNotificationByIdResponse, Error>({
    queryKey: ['massNotification', id],
    queryFn: async () => {
      const response = await massNotificationsService.getMassNotificationById(
        id
      );
      return response.data.data;
    },
    enabled: enabled && !!id,
  });

  return {
    massNotification,
    isLoading,
    isFetching,
    refetch,
    error,
  };
};
