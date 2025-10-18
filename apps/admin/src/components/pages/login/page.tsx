'use client';

import axios from 'axios';
import Image from 'next/image';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { AiBoxTextIcon, Button, Form, RHFInput, toast } from '@aibox/ui';
import { zodSchema } from './constants';
import { RefreshCw } from 'lucide-react';
import { useLoginMutation, useReloadCaptcha } from '@/services';
import { useGetUserProfile } from '@/services/user/user-profile/user-profile.hook';
import { strings } from '@/constant';
import { setCookie } from '@/utils/action';
import { HOME_ROUTES } from '@/routes';

interface IForm {
  username: string;
  password: string;
  captcha: string;
}

const LoginPage: FC = () => {
  const { push } = useRouter();

  const [captchaImage, setCaptchaImage] = useState('');
  const [captchaKey, setCaptchaKey] = useState('');
  const { mutateAsync } = useReloadCaptcha();
  const { mutateAsync: loginMutation, isPending } = useLoginMutation();
  const { mutateAsync: profileMutation, isPending: profileLoading } =
    useGetUserProfile();

  const form = useForm<IForm>({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      username: '',
      password: '',
      captcha: '',
    },
  });

  const submitHandler = async (data: IForm) => {
    try {
      const response = await loginMutation({
        password: data.password,
        username: data.username,
        ...(captchaImage
          ? {
              captcha_key: captchaKey,
              captcha_value: data.captcha,
            }
          : {}),
      });
      if (response.data.code === 'SUCCESS') {
        const isAdmin = response.data.data.token.is_admin;

        if (!isAdmin) {
          toast.error('strings.youDontHaveAccessToThisSection');
          return;
        }
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
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.data.error);
        setCaptchaImage(e.response?.data.data.captcha?.captcha_image);
        setCaptchaKey(e.response?.data.data.captcha?.captcha_key);
      }
    }
  };

  const reloadCaptcha = async () => {
    const resp = await mutateAsync({
      captcha_key: captchaKey,
    });
    if (resp.data.code === 'SUCCESS') {
      setCaptchaImage(resp.data.data.captcha.captcha_image);
      setCaptchaKey(resp.data.data.captcha.captcha_key);
    }
  };

  return (
    <Form {...form}>
      <div className="flex flex-col items-center gap-[2rem]">
        <AiBoxTextIcon />
        <form
          onSubmit={form.handleSubmit(submitHandler)}
          className="flex w-[20rem] flex-col gap-9 rounded-[0.625rem] bg-white px-[1.5rem] py-[2rem] shadow-[0_2px_4px_rgba(0,_0,_0,_0.16)] md:w-[30rem]"
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
          {captchaImage && (
            <div className="flex items-center justify-between">
              <RHFInput
                name="captcha"
                placeholder={'strings.captchCode'}
                className="w-full"
                endAdornment={
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={reloadCaptcha}
                    type="button"
                  >
                    <RefreshCw />
                  </Button>
                }
              />
              <Image src={captchaImage} alt="captch" width={160} height={60} />
            </div>
          )}
          <div className="mt-3 flex w-full flex-col gap-3">
            <Button
              variant="default"
              isFilled
              type="submit"
              loading={isPending || profileLoading}
              disabled={isPending || profileLoading}
              size="full"
            >
              {strings.login}
            </Button>
            <span className="text-normal cursor-not-allowed text-sm text-zinc-800">
              {strings.forgetPassword}
            </span>
          </div>
        </form>
      </div>
    </Form>
  );
};

export default LoginPage;
