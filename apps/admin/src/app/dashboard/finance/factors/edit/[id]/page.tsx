'use client';

import { NextPage } from 'next';
import { useParams } from 'next/navigation';

import { FactorForm } from '@/components/pages/factors';

const EditFactorPage: NextPage = () => {
  const params = useParams();
  const factorId = params.id as string;

  return <FactorForm factorId={factorId} />;
};

export default EditFactorPage;
