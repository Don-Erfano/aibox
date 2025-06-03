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
      if (!id) throw new Error('User ID is required');
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
      const response = await userInfoServices.UpdateUserInfo({ id, ...body });

      return response;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['userInfo', variables.id],
      });
    },
  });
};
