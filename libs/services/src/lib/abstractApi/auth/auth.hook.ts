import { useMutation } from '@tanstack/react-query';
import { AuthServices } from './auth.service';
const authServices = new AuthServices();

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (payload: any) =>
      await authServices.postUserAuthLogin(payload),
    mutationKey: [`useLoginMutation`],
  });
