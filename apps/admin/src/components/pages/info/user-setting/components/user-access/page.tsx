'use client';

import React, { FC, useState } from 'react';
import { Button, RadioGroup } from '@aibox/ui';
import { userAccessLevels } from './constant';
import { UserAccessLevelProps, UserLevels } from './types';

const UserAccessLevel: FC<UserAccessLevelProps> = ({ userLevel }) => {
  const [currentLevel, setCurrentLevel] = useState(userLevel);
  const [tempLevel, setTempLevel] = useState(currentLevel);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCancel = () => {
    setTempLevel(currentLevel);
    setEditMode(false);
  };

  const handleEdit = () => {
    setCurrentLevel(tempLevel);
    setEditMode(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-700 cursor-default">
        سطح دسترسی
      </p>
      <div>
        <RadioGroup
          defaultValue={currentLevel}
          value={tempLevel}
          onValueChange={(val: UserLevels) => setTempLevel(val)}
          items={userAccessLevels}
          isDisabled={editMode ? false : true}
        />
      </div>
      {editMode ? (
        <div className="flex items-center gap-5 ">
          <Button
            className="self-start w-auto"
            variant="outline"
            isFilled
            onClick={handleEdit}
          >
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
    </div>
  );
};

export default UserAccessLevel;
