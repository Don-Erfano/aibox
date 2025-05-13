import { useMutation } from '@tanstack/react-query';

import { ILogiPayload } from './interface';
import { AuthServices } from './login.service';

const authServices = new AuthServices();

export const useLoginMutation = () =>
  useMutation({
    mutationFn: async (payload: ILogiPayload) =>
      await authServices.postUserAuthLogin(payload),
    mutationKey: [`useLoginMutation`],
  });
