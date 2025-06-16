import { useMutation } from '@tanstack/react-query';
import UserProfileServices from './user-profile.service';

const userProfileServices = new UserProfileServices();

const useGetUserProfile = () =>
  useMutation({
    mutationFn: async () => await userProfileServices.getUserProfile(),
    mutationKey: [`useGetUserProfile`],
  });

export { useGetUserProfile };
