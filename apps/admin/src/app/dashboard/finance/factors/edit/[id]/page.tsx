'use client';

import { NextPage } from 'next';
import { FactorForm } from '@/components/pages/factors';
import { Suspense, use } from 'react';

const EditFactorPage: NextPage<{ params: Promise<{ id: string }> }> = ({
  params,
}) => {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <FactorFormWrapper params={params} />
    </Suspense>
  );
};

const FactorFormWrapper = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = use(params);
  return <FactorForm factorId={id} />;
};

export default EditFactorPage;
