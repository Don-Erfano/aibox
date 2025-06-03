import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import UserListsServices from '@/services/user/user-lists/user-lists.service';
import {
  IAddUserRequestPayload,
  IAddUserResponsePayload,
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
  IPutUser,
  IUser,
} from '@/services/user/user-lists/interface';
import { useQueryParams } from '@/hooks/useQueryParams';
import { showNotification } from '@/utils/notifications';

const userListsServices = new UserListsServices();

export const useGetUserList = () => {
  const allQueryParams = useQueryParams();

  let totalPages = 0;
  let totalItems = 0;
  const {
    data: users = [],
    isLoading,
    isFetching,
    refetch,
  } = useQuery<IGetUserListResponsePayload, Error, IUser[]>({
    queryKey: ['userList', allQueryParams],
    queryFn: async ({ queryKey }) => {
      const { page, ...params } = queryKey[1] as IGetUserListRequestPayload;
      const queryParams: IGetUserListRequestPayload = {
        page: page,
        page_size: 10,
        ...params,
      };

      const response = await userListsServices.getUserList(queryParams);
      return response.data.data;
    },
    select: (payload) => {
      totalPages = payload.page_count;
      totalItems = payload.total_count;
      return payload.user;
    },
    placeholderData: keepPreviousData,
  });

  return { users, totalItems, totalPages, isLoading, isFetching, refetch };
};

export const useAddUser = () => {
  const queryClient = useQueryClient();

  return useMutation<IAddUserResponsePayload, Error, IAddUserRequestPayload>({
    mutationFn: (newUserPayload: IAddUserRequestPayload) =>
      userListsServices.addUser(newUserPayload).then((res) => res.data.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['userList'] });
    },
  });
};

export const useGetUser = (userId: string) =>
  useQuery({
    queryKey: ['user', userId],
    queryFn: () => userListsServices.getUser(userId),
  });

export const usePostActivateEmail = () =>
  useMutation({
    mutationKey: ['postActivateEmail'],
    mutationFn: (email: string) => userListsServices.postActivateEmail(email),
    onSuccess: () => {
      showNotification({
        message: 'درخواست ارسال مجدد ایمیل فعالسازی با موفقیت ثبت شد.',
        type: 'success',
      });
    },
  });

export const usePutUserById = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['putUserById'],
    mutationFn: (data: IPutUser) => userListsServices.putUserById(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      showNotification({
        message: 'اطلاعات کاربر با موفقیت ویرایش شد.',
        type: 'success',
      });
    },
  });
};
