'use client';

import { FC, useState } from 'react';
import { AibStatus, Button, Modal, toast, ToggleGroup } from '@aibox/ui';
import { UserStatusProps } from './types';
import { toggleItems } from './constant';
import { useUpdateUserInfo } from '@/services/user/info';
import { strings } from '@/constant';

const UserStatusField: FC<UserStatusProps> = ({ status, userId }) => {
  const initialStatus = status ? 'active' : 'inactive';
  const [tempStatus, setTempStatus] = useState(initialStatus);
  const [open, setOpen] = useState(false);

  const { mutateAsync, isPending } = useUpdateUserInfo();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await mutateAsync({
        id: userId,
        is_active: tempStatus === 'active',
      });
      if (response.data.code === 'SUCCESS') {
        toast['success'](response.data.detail);

        setOpen(false);
      }
    } catch (error: any) {
      toast['error'](error.data.detail);
      setOpen(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-800 cursor-default">
        {strings.userStatus}
      </p>
      <AibStatus
        label={status ? strings.active : strings.deactive}
        bgColor={`${status ? 'bg-green-600' : ' text-zinc-700 bg-red-600'}`}
      />
      <Modal
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
        }}
        trigger={
          <Button variant="outline" isFilled className="self-start w-auto">
            {strings.changeUserStatus}
          </Button>
        }
        title={strings.changeUserStatus}
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
              {strings.submit}
            </Button>
            <Button
              className="self-start"
              variant="default"
              onClick={handleCancel}
              type="button"
              disabled={isPending}
            >
              {strings.ignore}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UserStatusField;
