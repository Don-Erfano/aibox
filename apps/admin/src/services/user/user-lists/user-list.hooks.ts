import type { UseQueryOptions } from '@tanstack/react-query';
import type {
  IGetUserListRequestPayload,
  IGetUserListResponsePayload,
} from './interface';
import UserListsServices from './user-lists.service';
import { useQuery } from '@/hooks/useQery';

const userListsServices = new UserListsServices();

export function useGetUserList(
  params: IGetUserListRequestPayload,
  options?: UseQueryOptions<IGetUserListResponsePayload>
) {
  return useQuery(
    ['getUserList', params] as const,
    async () => {
      const resp = await userListsServices.getUserList(params);
      return resp.data.data;
    },
    options
  );
}
