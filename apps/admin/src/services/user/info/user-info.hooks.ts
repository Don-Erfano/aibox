import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import UserInfoServices from './user-info.service';
import type {
  IGetUserInfoRequestPayload,
  IUpdateUserInfoRequest,
} from './interface';

const userInfoServices = new UserInfoServices();

export const useGetUserInfo = ({ id }: IGetUserInfoRequestPayload) => {
  const { data: user = undefined, isPending } = useQuery({
    queryKey: ['userInfo', id],
    queryFn: async () => {
      const response = await userInfoServices.getUserInfo({ id });
      return response.data.data;
    },
    enabled: !!id,
  });

  return { user, isPending };
};

export const useUpdateUserInfo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...body }: IUpdateUserInfoRequest) => {
      return await userInfoServices.UpdateUserInfo({ id, ...body });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['userInfo', variables.id],
      });
    },
  });
};
