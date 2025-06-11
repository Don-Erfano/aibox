'use client';

import { Button, Form } from '@aibox/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useGetUser, usePutUserById } from '@/services/user/user-lists';

import { userInfoSchema } from './constants';
import { UserInfoForm } from './interface';
import { UserInfo } from './user-info';
import { UserInfoFormFields } from './user-info-form-fields';
import { userInfoStrings } from './strings';

const UserInfoTab: FC<{ userId: string }> = ({ userId }) => {
  const [editMode, setEditMode] = useState(false);

  const { data: user } = useGetUser(userId);

  const form = useForm<UserInfoForm>({
    mode: 'onChange',
    resolver: zodResolver(userInfoSchema),
  });

  const { mutate: putUser, isPending: isPutUserPending } = usePutUserById();

  const onSubmit = (data: UserInfoForm) => {
    const { email, ...fields } = data;
    putUser(
      { id: userId, ...fields },
      {
        onSuccess: () => {
          setTimeout(() => {
            setEditMode(false);
            form.reset();
          }, 1000);
        },
      }
    );
  };

  useEffect(() => {
    form.reset({
      email: user?.email,
      first_name: user?.first_name,
      last_name: user?.last_name,
      gender: user?.gender,
      is_active: user?.is_active + '',
      nickname: user?.nickname,
      phone_number: user?.phone_number,
    });
  }, [form, user]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      {editMode ? (
        <div className="border border-neutral-200 px-5 pt-5 pb-12 rounded-lg xl:px-6 mx-auto max-w-[1376px]">
          <p className="pb-4 text-sm/5 font-medium text-slate-900 border-b border-neutral-200">
            {userInfoStrings.editUserAccountInfo}
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <UserInfoFormFields user={user} />
              <div className="flex flex-col sm:flex-row justify-center items-center gap-5">
                <Button
                  type="submit"
                  isFilled
                  size="lg"
                  variant="outline"
                  disabled={isPutUserPending}
                >
                  {userInfoStrings.sumbitChanges}
                </Button>
                <Button
                  type="button"
                  size="lg"
                  variant="outline"
                  onClick={() => setEditMode(false)}
                >
                  {userInfoStrings.cancel}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col gap-10">
          <UserInfo user={user} />
          <Button
            size="lg"
            isFilled
            variant="link"
            onClick={() => setEditMode(true)}
          >
            {userInfoStrings.editInfo}
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserInfoTab;
