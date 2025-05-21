'use client';

import React, { FC, useState } from 'react';
import { Button, Modal, StatusBox, ToggleGroup } from '@aibox/ui';
import { UserStatusProps } from './types';
import { toggleItems } from './constant';
import { useUpdateUserStatus } from '@/services/user/info/user-setting/user-status';

const UserStatusField: FC<UserStatusProps> = ({ status, userId }) => {
  const initialStatus = status ? 'active' : 'inactive';
  const [userStatus, setUserStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);

  const mutation = useUpdateUserStatus();

  const handleCancel = () => {
    setUserStatus(initialStatus);
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      // await mutation.mutateAsync({ id: userId }); TODO: set api
      setOpen(false);
      console.log(userStatus);
      // TODO : toast
    } catch (error) {
      // TODO : toast
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-700 cursor-default">
        وضعیت کاربر
      </p>
      <StatusBox isActive={status} />
      <Modal
        open={open}
        onOpenChange={setOpen}
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
            value={userStatus}
            onValueChange={setUserStatus}
          />
          <div className="flex items-center justify-center gap-5 ">
            <Button
              className="self-start "
              variant="default"
              isFilled
              type="submit"
              onClick={handleSubmit}
            >
              ثبت
            </Button>
            <Button
              className="self-start"
              variant="default"
              onClick={handleCancel}
              type="button"
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
