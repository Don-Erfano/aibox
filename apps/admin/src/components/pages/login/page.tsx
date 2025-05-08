'use client';

import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { AiBoxTextIcon, Button, Textfield } from '@aibox/ui';

import { zodSchema } from './constants';
import { setCookie } from '@/app/utils/action';
import { useLoginMutation } from '@/services/login';

const LoginPage: FC = () => {
  const { mutateAsync } = useLoginMutation();
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const submitHandler = async (data: any) => {
    try {
      const response = await mutateAsync(data);
      if (response.data.code === 'SUCCESS') {
        console.log(response.data);
        setCookie('token', response.data.data.token.access_token);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex flex-col items-center gap-[2rem]">
      <AiBoxTextIcon />
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white w-[20rem] md:w-[30rem] px-[1.5rem] py-[2rem] rounded-[0.625rem] flex flex-col justify-between h-[23rem] shadow-[0_2px_4px_rgba(0,_0,_0,_0.16)]"
      >
        <h3 className="text-md font-medium">ورود به حساب کاربری</h3>
        <div className="flex flex-col gap-[18px]">
          <Textfield
            control={control}
            placeholder="*شماره موبایل/ایمیل"
            name="username"
          />
          <Textfield
            control={control}
            placeholder="*کلمه عبور"
            name="password"
            type="password"
          />
          <Button variant="default" type="submit">
            ورود
          </Button>
          <span className="text-sm text-normal text-teal-600 cursor-not-allowed">
            فراموشی کلمه عبور
          </span>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
