'use client';

import { Button, StatusBox } from '@aibox/ui';
import React, { useState } from 'react';

const UserStatusField = () => {
  const [userStatus, setUserStatus] = useState();
  const [isModalOpen, setIsModalOpen] = useState();
  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-700">وضعیت کاربر</p>
      <StatusBox isActive={true} />
      <Button className="self-start ">تغییر وضعیت کاربر</Button>
    </div>
  );
};

export default UserStatusField;
