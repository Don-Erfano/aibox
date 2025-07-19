'use client';

import { NextPage } from 'next';
import { ConfigurationList } from '@/components';
import { Suspense } from 'react';

const Page: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <ConfigurationList />
  </Suspense>
);

export const dynamic = 'force-dynamic';

export default Page;
