import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFInput, RHFRadioGroup } from '@aibox/ui';
import { userSchema, defaultValues, UserSchemaType } from './schema';
import { useAddUser } from '@/services/user/user-lists';
import { useRouter } from 'next/navigation';

const AddUserPage: FC = () => {
  const router = useRouter();
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const { mutate: addUser, isSuccess } = useAddUser();

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    addUser({
      email: data.email,
      is_admin: data.accessLevel === 'admin',
    });
  };
  const handleCancel = () => {
    form.reset();
    router.push('/dashboard/user-list');
  };

  useEffect(() => {
    if (isSuccess) {
      router.push('/dashboard/user-list');
    }
  }, [isSuccess, router]);

  return (
    <FormContainer title="افزودن کاربر جدید">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="email"
              control={form.control}
              label="ایمیل*"
              placeholder="example@domain.com"
              type="email"
            />

            <RHFInput
              name="password"
              control={form.control}
              label="کلمه عبور"
              placeholder="کلمه عبور"
              type="password"
            />

            <RHFRadioGroup
              name="accessLevel"
              control={form.control}
              label="سطح دسترسی*"
              options={[
                { id: 'user', label: 'کاربر' },
                { id: 'admin', label: 'ادمین' },
              ]}
              className="flex gap-8"
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-6">
            <Button size="lg" isFilled type="submit">
              ثبت
            </Button>
            <Button size="lg" type="button" onClick={handleCancel}>
              لغو عملیات
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddUserPage;
