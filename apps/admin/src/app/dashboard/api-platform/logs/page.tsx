'use client';

import { ApiLogs } from '@/components';
import { NextPage } from 'next';
import { Suspense } from 'react';

const Page: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <ApiLogs />
  </Suspense>
);

export default Page;
