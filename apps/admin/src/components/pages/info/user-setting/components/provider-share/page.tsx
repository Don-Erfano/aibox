'use client';

import { Button } from '@aibox/ui';
import React, { useState } from 'react';

const ProviderShareField = () => {
  const [providerShare, setProviderShare] = useState();
  const [isModalOpen, setIsModalOpen] = useState();

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-700">سهم ارائه‌ دهنده</p>

      <p className="font-normal text-sm text-zinc-600">
        سهم ارائه دهنده: ۸۰٪ - سهم پلتفرم: ۲۰٪{' '}
      </p>
      <Button className="self-start">تغییر سهم ارائه‌ دهنده</Button>
    </div>
  );
};

export default ProviderShareField;
