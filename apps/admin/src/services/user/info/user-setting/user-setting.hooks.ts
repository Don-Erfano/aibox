// import { keepPreviousData, useQuery } from '@tanstack/react-query';
// import UserListsServices from '@/services/user/user-lists/user-lists.service';
// import {
//   IGetUserListRequestPayload,
//   IGetUserListResponsePayload,
//   IUser,
// } from '@/services/user/user-lists/interface';
// import { useQueryParams } from '@/hooks/useQueryParams';

// const userListsServices = new UserListsServices();

// export const useGetUserList = () => {
//   const allQueryParams = useQueryParams();

//   let totalPages = 0;
//   let totalItems = 0;
//   const { data: users = [], isLoading } = useQuery<
//     IGetUserListResponsePayload,
//     Error,
//     IUser[]
//   >({
//     queryKey: ['userList', allQueryParams],
//     queryFn: async ({ queryKey }) => {
//       const { page, ...params } = queryKey[1] as IGetUserListRequestPayload;
//       const queryParams: IGetUserListRequestPayload = { page: page, ...params };

//       const response = await userListsServices.getUserList(queryParams);
//       return response.data.data;
//     },
//     select: (payload) => {
//       totalPages = payload.page_count;
//       totalItems = payload.total_count;
//       return payload.user;
//     },
//     placeholderData: keepPreviousData,
//   });

//   return { users, totalItems, totalPages, isLoading };
// };
