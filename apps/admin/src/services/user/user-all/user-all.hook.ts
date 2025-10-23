import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  IGetAllUserListRequestPayload,
  IGetAllUserListResponsePayload,
} from "./interface";
import UserAllListsService from "./user-all.service";

const userAllListsService = new UserAllListsService();

export const useGetAllUserList = (
  params: Partial<IGetAllUserListRequestPayload> = {},
) => {
  const query = useQuery<
    IGetAllUserListResponsePayload,
    Error,
    IGetAllUserListResponsePayload["users"]
  >({
    queryKey: ["allUserList", params],
    queryFn: () =>
      userAllListsService.getAllUserList(params).then((res) => res.data.data),
    select: (payload) => payload.users,
    placeholderData: keepPreviousData,
  });

  return {
    users: query.data ?? [],
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    refetch: query.refetch,
  };
};
