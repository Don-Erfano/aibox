'use client';

import { NextPage } from 'next';
import { GiftCodeForm } from '@/components/pages/gift-code';
import { Suspense, use } from 'react';

const EditGiftCodePage: NextPage<{ params: Promise<{ id: string }> }> = ({
  params,
}) => {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <GiftCodeFormWrapper params={params} />
    </Suspense>
  );
};

const GiftCodeFormWrapper = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  return <GiftCodeForm giftCodeId={id} />;
};

export default EditGiftCodePage;
