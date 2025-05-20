'use client';

import React, { FC, useState } from 'react';
import { Button, Form, RHFRadioGroup } from '@aibox/ui';
import { userAccessLevels } from './constant';
import { FormValues, UserAccessLevelProps, UserLevels } from './types';
import { SubmitHandler, useForm } from 'react-hook-form';

const UserAccessLevel: FC<UserAccessLevelProps> = ({ userLevel }) => {
  const [currentLevel, setCurrentLevel] = useState<UserLevels>(userLevel);
  const [editMode, setEditMode] = useState<boolean>(false);

  const form = useForm<FormValues>({
    defaultValues: { accessLevel: currentLevel },
  });

  const { control, reset, handleSubmit } = form;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setCurrentLevel(data.accessLevel);
    setEditMode(false);
  };

  const handleCancel = () => {
    reset({ accessLevel: currentLevel });
    setEditMode(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 max-w-3xs"
      >
        <p className="font-medium text-sm text-zinc-700 cursor-default">
          سطح دسترسی
        </p>
        <div>
          <RHFRadioGroup
            control={control}
            name="accessLevel"
            disabled={!editMode}
            options={userAccessLevels}
          />
        </div>
        {editMode ? (
          <div className="flex items-center gap-5 ">
            <Button className="self-start w-auto" variant="outline" isFilled>
              ثبت
            </Button>
            <Button
              className="self-start w-auto"
              variant="outline"
              onClick={handleCancel}
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
