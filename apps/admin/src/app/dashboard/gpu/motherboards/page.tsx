'use client';
import { MohterboardList } from '@/components';
import { Suspense } from 'react';

const Page = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <MohterboardList />
  </Suspense>
);

export default Page;
