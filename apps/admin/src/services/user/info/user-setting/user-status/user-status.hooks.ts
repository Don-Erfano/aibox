import { useMutation, useQueryClient } from '@tanstack/react-query';
import UserStatusServices from './user-status.service';
import { IUpdateUserStatusRequestPayload } from './interface';

const userStatusService = new UserStatusServices();

export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id }: IUpdateUserStatusRequestPayload) => {
      if (!id) throw new Error('User ID is required');
      const response = await userStatusService.getUserStatus({ id });
      return response.data.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['user-status', variables.id],
      });
    },
  });
};
