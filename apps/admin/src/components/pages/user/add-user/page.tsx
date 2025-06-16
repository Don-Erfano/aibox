'use client';

import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormContainer, FormWrapper } from '@/components';
import { Button, Form, RHFInput, RHFRadioGroup } from '@aibox/ui';
import { userSchema, defaultValues, UserSchemaType } from './schema';
import { useAddUser } from '@/services/user/user-lists';
import { useRouter } from 'next/navigation';
import { UserStrings } from '@/components/pages/user/user-list/string';
import { USERS_ROUTES } from '@/routes';

const AddUserPage: FC = () => {
  const router = useRouter();
  const form = useForm<UserSchemaType>({
    resolver: zodResolver(userSchema),
    defaultValues,
  });

  const { mutate: addUser, isPending } = useAddUser();

  const onSubmit: SubmitHandler<UserSchemaType> = (data) => {
    addUser(
      {
        email: data.email,
        is_admin: data.accessLevel === 'admin',
      },
      {
        onSuccess: () => {
          router.push(USERS_ROUTES.LIST);
        },
      }
    );
  };
  const handleCancel = () => {
    form.reset();
    router.push(USERS_ROUTES.LIST);
  };

  return (
    <FormContainer title={UserStrings.add_user}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormWrapper>
            <RHFInput
              name="email"
              control={form.control}
              label={UserStrings.email}
              placeholder="example@domain.com"
              type="email"
            />

            <RHFInput
              name="password"
              control={form.control}
              label={UserStrings.password}
              placeholder={UserStrings.password}
              type="password"
            />

            <RHFRadioGroup
              name="accessLevel"
              control={form.control}
              label={UserStrings.access_level}
              options={[
                { id: 'user', label: 'کاربر' },
                { id: 'admin', label: 'ادمین' },
              ]}
              className="flex gap-8"
            />
          </FormWrapper>

          <div className="flex gap-5 justify-center mt-12">
            <Button size="lg" isFilled type="submit" disabled={isPending}>
              {UserStrings.submit}
            </Button>
            <Button size="lg" type="button" onClick={handleCancel}>
              {UserStrings.cancel_operation}
            </Button>
          </div>
        </form>
      </Form>
    </FormContainer>
  );
};

export default AddUserPage;
