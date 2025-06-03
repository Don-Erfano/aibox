'use client';

import React, { FC, useEffect, useState } from 'react';
import { Button } from '@aibox/ui';
import { ProviderShareProps } from './types';

const ProviderShareField: FC<ProviderShareProps> = ({ data }) => {
  const [providerShare, setProviderShare] = useState<number | undefined>(
    data?.owner_earning_coefficient
  );
  const [platformShare, setPlatformShare] = useState<number | undefined>(
    data?.withdraw_coefficient
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setProviderShare(data?.owner_earning_coefficient);
    setPlatformShare(data?.withdraw_coefficient);
  }, [data]);

  const handleEdit = () => {
    console.log('edit');
  };

  return (
    <div className="flex flex-col gap-4 max-w-3xs">
      <p className="font-medium text-sm text-zinc-800 cursor-default">
        سهم ارائه‌ دهنده
      </p>

      <p className="font-normal text-sm text-zinc-600">
        سهم ارائه دهنده: {providerShare}٪ - سهم پلتفرم: {platformShare}٪
      </p>
      <Button variant="outline" isFilled className="self-start w-auto">
        تغییر سهم ارائه‌ دهنده
      </Button>
    </div>
  );
};

export default ProviderShareField;
