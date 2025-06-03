'use client';

import React, { FC, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, Form, RHFRadioGroup } from '@aibox/ui';
import { userAccessLevels } from './constant';
import { FormValues, UserAccessLevelProps } from './types';
import { useUpdateUserInfo } from '@/services/user/info';

const UserAccessLevel: FC<UserAccessLevelProps> = ({ userLevel, userId }) => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<FormValues>({
    defaultValues: { accessLevel: userLevel },
  });

  const { control, reset, handleSubmit } = form;

  const { mutateAsync, isPending } = useUpdateUserInfo();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      if (data.accessLevel) {
        const response = await mutateAsync({
          id: userId,
          is_admin: data.accessLevel === 'admin',
          is_staff: data.accessLevel === 'operator',
        });

        if (response.data.code === 'SUCCESS') {
          console.log('success');
          setEditMode(false);
        }
      }
    } catch (error) {
      console.log('error:', error);
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    reset({ accessLevel: userLevel });
    setEditMode(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-3xs"
      >
        <p className="font-medium text-sm text-zinc-800 ">سطح دسترسی</p>
        <div>
          <RHFRadioGroup
            control={control}
            name="accessLevel"
            disabled={!editMode}
            options={userAccessLevels}
          />
        </div>
        {editMode ? (
          <div className="flex items-center gap-2  ">
            <Button
              className="self-start w-auto"
              variant="outline"
              isFilled
              disabled={isPending}
            >
              {isPending ? 'در حال ثبت...' : 'ثبت'}
            </Button>
            <Button
              className="self-start w-auto"
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              لغو
            </Button>
          </div>
        ) : (
          <Button
            onClick={() => setEditMode(true)}
            className="self-start w-auto"
            variant="outline"
            isFilled
          >
            تغییر سطح دسترسی
          </Button>
        )}
      </form>
    </Form>
  );
};

export default UserAccessLevel;
