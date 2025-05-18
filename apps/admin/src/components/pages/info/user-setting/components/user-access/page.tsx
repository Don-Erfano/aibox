'use client';

import { Button, RadioGroup } from '@aibox/ui';
import React, { useState } from 'react';
import { userAccessLevels } from './constant';

const UserAccessLevel = () => {
  const [currentLevel, setCurrentLevel] = useState('');
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
      <p className="font-medium text-sm text-zinc-700">سطح دسترسی</p>
      <div>
        <RadioGroup
          defaultValue={currentLevel}
          value={tempLevel}
          onValueChange={(val) => setTempLevel(val)}
          items={userAccessLevels}
          isDisabled={editMode ? false : true}
        />
      </div>
      {editMode ? (
        <div className=" flex items-center gap-5 ">
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
