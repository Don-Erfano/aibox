'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { AiBoxTextIcon, Button, Form, RHFInput } from '@aibox/ui';

import { strings } from '@/constant';
import { HOME_ROUTES } from '@/routes';
import { zodSchema } from './constants';
import { setCookie } from '@/utils/action';
import { useLoginMutation } from '@/services/login';
import { useGetUserProfile } from '@/services/user/user-profile/user-profile.hook';

interface IForm {
  username: string;
  password: string;
}

const LoginPage: FC = () => {
  const { push } = useRouter();
  const { mutateAsync, isPending } = useLoginMutation();
  const { mutateAsync: profileMutation } = useGetUserProfile();
  const form = useForm<IForm>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitHandler = async (data: IForm) => {
    try {
      const response = await mutateAsync(data);
      if (response.data.code === 'SUCCESS') {
        setCookie('refreshToken', response.data.data.token.refresh_token);
        await setCookie('token', response.data.data.token.access_token);
        const userProfileResponse = await profileMutation();
        if (userProfileResponse.data.code === 'SUCCESS') {
          localStorage.setItem(
            'userInfo',
            JSON.stringify(userProfileResponse.data.data)
          );
          push(HOME_ROUTES.DASHBOARD);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-[2rem]">
        <AiBoxTextIcon />
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="bg-white w-[20rem] md:w-[30rem] px-[1.5rem] py-[2rem] rounded-[0.625rem] flex flex-col gap-9 shadow-[0_2px_4px_rgba(0,_0,_0,_0.16)]"
        >
          <h3 className="text-base font-medium">
            {strings.loginToYourAccount}
          </h3>
          <RHFInput
            control={form.control}
            placeholder={strings.phoneOrEmail}
            name="username"
          />
          <RHFInput
            control={form.control}
            placeholder={strings.password}
            name="password"
            type="password"
          />
          <div className="mt-3 w-full flex gap-3 flex-col">
            <Button
              variant="default"
              isFilled
              type="submit"
              disabled={isPending}
              size="full"
            >
              {strings.login}
            </Button>
            <span className="text-sm text-normal text-zinc-800 cursor-not-allowed">
              {strings.forgetPassword}
            </span>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default LoginPage;
