'use client';

import { GpusList } from '@/components';
import { NextPage } from 'next';
import { Suspense } from 'react';

const Page: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <GpusList />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default Page;
