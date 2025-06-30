'use client';

import { Button } from '@aibox/ui';
import clsx from 'clsx';
import { Circle, Mail, Phone, SquareUserRound, UserRound } from 'lucide-react';
import Image from 'next/image';
import { FC } from 'react';

import { strings } from '@/constant';
import { usePostActivateEmail } from '@/services/user/user-lists';
import { IUser } from '@/services/user/user-lists/interface';

export const UserInfo: FC<{ user: IUser }> = ({ user }) => {
  const { mutate: postActivateEmail, isPending } = usePostActivateEmail();

  const hasFirstName = !!user.first_name;
  const hasLastName = !!user.last_name;

  return (
    <div className="w-full flex justify-center items-center flex-col gap-10">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="size-24 flex justify-center items-center rounded-full border border-neutral-600">
          {user.profile_picture ? (
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
        <span
          className={clsx('text-sm/6 font-medium text-neutral-800', {
            'text-red-700': !hasFirstName && !hasLastName,
          })}
        >
          {!hasFirstName && !hasLastName
            ? strings.notRegistered
            : `${user.first_name} ${user.last_name}`}
        </span>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-9 text-sm/6 font-normal">
        <div
          className={clsx('text-neutral-600 flex items-center gap-1', {
            'text-red-700': !user.email_verified,
          })}
        >
          <Mail size="20" />
          <span>{user.email}</span>
        </div>

        <div
          className={clsx('text-neutral-600 flex items-center gap-1', {
            'text-red-700': !user.nickname,
          })}
        >
          <SquareUserRound size="20" />
          <span>{user.nickname || strings.notRegistered}</span>
        </div>

        <div
          className={clsx('text-neutral-600 flex items-center gap-1', {
            'text-red-700': !user.phone_verified,
          })}
        >
          <Phone size="20" />
          {user.phone_number ? `0${user.phone_number}` : strings.notRegistered}
        </div>
      </div>
      <div className="px-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 text-sm/6 font-normal text-teal-700">
        <span>
          {strings.registeredApi}: {user.my_api_count}
        </span>
        <span>
          {strings.apiPackage}:{' '}
          <span dir="ltr">{user.my_api_package_count}</span>
        </span>
        <span>
          {strings.gpuPackage}:{' '}
          {user.gpu_package ? strings.has : strings.doestNotHave}
        </span>
      </div>
      <div className="flex w-full flex-col items-center sm:items-start sm:justify-start gap-4 px-4">
        {user?.is_active && !user?.email_verified && (
          <div className="w-full flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-4">
            <p className="text-sm/6  font-normal text-red-700 flex items-center gap-2">
              <Circle className="fill-red-700" size="8" />
              <span>{strings.deacitvedEmail}</span>
            </p>
            <Button
              variant="link"
              size="lg"
              className="!w-fit"
              onClick={() => postActivateEmail(user.email)}
              disabled={isPending}
            >
              {strings.resendActivationEmail}
            </Button>
          </div>
        )}
        {user.phone_number && !user.phone_verified && (
          <p className="text-sm/6 font-normal text-red-700 flex items-center gap-2">
            <Circle className="fill-red-700" size="8" />
            <span>{strings.deactivedPhoneNumber}</span>
          </p>
        )}
        {!user.phone_number && (
          <p className="text-sm/6 font-normal text-red-700 flex items-center gap-2">
            <Circle className="fill-red-700" size="8" />
            <span>{strings.notRegisteredPhoneNumber}</span>
          </p>
        )}
      </div>
    </div>
  );
};
