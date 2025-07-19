'use client';

import { NextPage } from 'next';
import { ConfigurationForm } from '@/components';
import { Suspense, use } from 'react';

const Page: NextPage<{ params: Promise<{ id: string }> }> = ({ params }) => {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <ConfigurationFormWrapper params={params} />
    </Suspense>
  );
};

const ConfigurationFormWrapper = ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = use(params);
  return <ConfigurationForm id={id} />;
};

export default Page;
