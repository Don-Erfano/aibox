'use client';

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFInput } from '@aibox/ui';

type FormValues = {
  username: string;
  email: string;
};

const AddTicketPage: FC = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      username: '',
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log('form data', data);
  };

  return (
    <FormContainer title="افزودن تیکت جدید">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormWrapper>
            <RHFInput
              name="username"
              control={form.control}
              label="عنوان درخواست"
              description="نام کاربری را وارد کنید"
              placeholder="عنوان درخواست..."
            />

            <RHFInput
              name="email"
              control={form.control}
              label="ایمیل"
              description="آدرس ایمیل معتبر"
              type="email"
              placeholder="example@mail.com"
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-6">
            <Button size="lg" isFilled type="submit">
              ثبت
            </Button>
            <Button
              size="lg"
              type="button"
              onClick={() => console.log('cancel')}
            >
              لغو عملیات
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddTicketPage;
