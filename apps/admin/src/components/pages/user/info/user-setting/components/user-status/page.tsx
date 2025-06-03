'use client';

import React, { FC, useState } from 'react';
import { AibStatus, Button, Modal, ToggleGroup } from '@aibox/ui';
import { UserStatusProps } from './types';
import { toggleItems } from './constant';
import { useUpdateUserInfo } from '@/services/user/info';

const UserStatusField: FC<UserStatusProps> = ({ status, userId }) => {
  const initialStatus = status ? 'active' : 'inactive';
  const [userStatus, setUserStatus] = useState(initialStatus);
  const [tempStatus, setTempStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateUserInfo();

  const handleCancel = () => {
    setUserStatus(initialStatus);
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await mutateAsync({
        id: userId,
        is_active: tempStatus === 'active',
      });
      if (response.data.code === 'SUCCESS') {
        console.log('success');
        setUserStatus(tempStatus);
        setOpen(false);
      }
      // TODO : toast
    } catch (error) {
      // TODO : toast
      console.log(error);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-800 cursor-default">
        وضعیت کاربر
      </p>
      <AibStatus
        label={userStatus == 'active' ? 'فعال' : 'غیرفعال'}
        bgColor={`${
          userStatus === 'active' ? 'bg-green-600' : ' text-zinc-700 bg-red-600'
        }`}
      />
      <Modal
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (isOpen) setTempStatus(userStatus);
        }}
        trigger={
          <Button variant="outline" isFilled className="self-start w-auto">
            تغییر وضعیت کاربر
          </Button>
        }
        title="تغییر وضعیت کاربر"
      >
        <div className=" flex flex-col gap-8 items-center ">
          <ToggleGroup
            items={toggleItems}
            value={tempStatus}
            onValueChange={setTempStatus}
          />
          <div className="flex items-center justify-center gap-5 ">
            <Button
              variant="default"
              isFilled
              type="submit"
              onClick={handleSubmit}
              disabled={isPending}
            >
              ثبت
            </Button>
            <Button
              className="self-start"
              variant="default"
              onClick={handleCancel}
              type="button"
              disabled={isPending}
            >
              لغو
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserStatusField;
