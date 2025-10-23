'use client';
import nextDynamic from 'next/dynamic';
import { Loading } from '@aibox/ui';
import { Suspense } from 'react';
import { NextPage } from 'next';

const ServersTabs = nextDynamic(
  () => import('@/components/pages/gpu/servers').then((m) => m.ServersTab),
  { ssr: false }
);

const Page: NextPage = () => (
  <Suspense fallback={<Loading />}>
    <ServersTabs />
  </Suspense>
);

export const dynamic = 'force-dynamic';
export default Page;
