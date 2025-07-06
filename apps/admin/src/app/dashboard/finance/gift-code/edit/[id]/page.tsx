'use client';

import { useParams } from 'next/navigation';

import { GiftCodeForm } from '@/components/pages/gift-code';

const EditGiftCodePage = () => {
  const params = useParams();
  const giftCodeId = params.id as string;

  return <GiftCodeForm giftCodeId={giftCodeId} />;
};

export default EditGiftCodePage;
