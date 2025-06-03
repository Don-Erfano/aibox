'use client';

import { RHFAutocomplete, RHFInput, RHFRadioGroup } from '@aibox/ui';
import { UserRound } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';
import { useFormContext } from 'react-hook-form';

import { IUser } from '@/services/user/user-lists/interface';

import { genderOptions, statusOptions } from './constants';
import { UserInfoForm } from './interface';
import { userInfoStrings } from './strings';

export const UserInfoFormFields: FC<{ user: IUser }> = ({ user }) => {
  const { control } = useFormContext<UserInfoForm>();

  return (
    <div className="flex flex-col gap-10 lg:flex-row items-center lg:items-start w-full py-12">
      <div className="size-24 shrink-0 flex justify-center items-center rounded-full border border-neutral-600">
        {user?.profile_picture ? (
          <Image
            src={user.profile_picture}
            alt={user.email}
            width={80}
            height={80}
          />
        ) : (
          <UserRound size="80" className="text-slate-300" />
        )}
      </div>
      <div className="grid w-full grow grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
        <RHFInput
          name="first_name"
          control={control}
          label={userInfoStrings.firstName}
          variant="sm"
        />
        <RHFInput
          name="last_name"
          control={control}
          label={userInfoStrings.lastName}
          variant="sm"
        />
        <RHFInput
          name="nickname"
          control={control}
          label={userInfoStrings.nickname}
          variant="sm"
          disabled={!!user.nickname}
        />
        <RHFInput
          name="email"
          control={control}
          label={`${userInfoStrings.email}*`}
          type="email"
          variant="sm"
          disabled
        />
        <RHFInput
          name="phone_number"
          control={control}
          label={userInfoStrings.phoneNumber}
          variant="sm"
        />
        <RHFAutocomplete
          name="gender"
          control={control}
          label={userInfoStrings.gender}
          placeholder=""
          options={genderOptions}
          h_size="sm"
        />
        <RHFRadioGroup
          name="is_active"
          control={control}
          label={userInfoStrings.status}
          options={statusOptions}
          className="flex gap-8"
        />
      </div>
    </div>
  );
};
