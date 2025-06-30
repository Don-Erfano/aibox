'use client';

import { NextPage } from 'next';

import { ConfigurationForm } from '@/components';
import { use } from 'react';

const Page: NextPage<{ params: Promise<{ id: string }> }> = ({ params }) => {
  const { id } = use(params);

  return <ConfigurationForm id={id} />;
};

export default Page;
