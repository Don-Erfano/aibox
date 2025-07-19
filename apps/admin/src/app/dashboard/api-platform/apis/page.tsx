'use client';

import { NextPage } from 'next';
import { ApiList } from '@/components';
import { Suspense } from 'react';

const Page: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <ApiList />
  </Suspense>
);

export default Page;
