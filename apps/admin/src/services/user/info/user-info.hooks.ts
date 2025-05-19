import { useQuery } from '@tanstack/react-query';
import UserInfoServices from './user-info.service';
import { IGetUserInfoRequestPayload } from './interface';

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
