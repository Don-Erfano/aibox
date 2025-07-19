'use client';

import { NextPage } from 'next';

import { GiftCodeTable } from '@/components/pages/gift-code';
import { Suspense } from 'react';

const GiftCodePage: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <GiftCodeTable />
  </Suspense>
);

export const dynamic = 'force-dynamic';

export default GiftCodePage;
