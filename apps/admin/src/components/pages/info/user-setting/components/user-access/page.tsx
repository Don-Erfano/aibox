'use client';

import { Button } from '@aibox/ui';
import React, { useState } from 'react';

const UserAccessLevel = () => {
  const [currentLevel, setCurrentLevel] = useState('');
  const [tempLevel, setTempLevel] = useState(currentLevel);
  const [editMode, setEditMode] = useState<boolean>(false);

  const handleCancel = () => {
    console.log('cancel');
    setTempLevel(currentLevel);
    setEditMode(false);
  };

  const handleEdit = () => {
    setCurrentLevel(tempLevel);
    setEditMode(false);
    console.log('edit');
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-700">سطح دسترسی</p>
      <p>test</p>
      {editMode ? (
        <div className=" flex items-center gap-5 ">
          <Button onClick={handleEdit}>ثبت</Button>
          <Button onClick={handleCancel}>لغو</Button>
        </div>
      ) : (
        <Button onClick={() => setEditMode(true)} className="self-start">
          تغییر سطح دسترسی
        </Button>
      )}
    </div>
  );
};

export default UserAccessLevel;
