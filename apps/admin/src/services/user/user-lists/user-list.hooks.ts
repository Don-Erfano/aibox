import {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';
import { INetworkResponse } from '@aibox/services';
import UserListsServices from '@/services/user/user-lists/user-lists.service';
import { useQuery } from '@tanstack/react-query';

const userListsServices = new UserListsServices();

export const useGetUserList = (params: IGetUserListRequestPayload) => {
  const query = useQuery<INetworkResponse<IGetUserListResponsePayload>, Error>({
    queryKey: ['useGetUserList', params],
    queryFn: async () => {
      const response = await userListsServices.getUserList(params);
      return response.data;
    },
  });

  const page = query.data?.data.page_count ?? 0;
  const total = query.data?.data.total_count ?? 0;

  return {
    ...query,
    users: query.data?.data.user ?? [],
    page,
    total,
  };
};
