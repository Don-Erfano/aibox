'use client';

import React, { FC, useState } from 'react';
import { AibStatus, Button } from '@aibox/ui';
import { UserStatusProps } from './types';

const UserStatusField: FC<UserStatusProps> = ({ status }) => {
  const [userStatus, setUserStatus] = useState(status);
  const [isModalOpen, setIsModalOpen] = useState();

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-800 cursor-default">
        وضعیت کاربر
      </p>
      <AibStatus
        label={userStatus ? 'فعال' : 'غیرفعال'}
        bgColor={`${userStatus ? 'bg-green-600' : ' bg-red-600'} text-zinc-700`}
      />
      <Button variant="outline" isFilled className="self-start w-auto">
        تغییر وضعیت کاربر
      </Button>
    </div>
  );
};

export default UserStatusField;
