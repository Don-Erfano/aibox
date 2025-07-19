'use client';

import { NextPage } from 'next';
import FactorsTable from '@/components/pages/factors/factors-table';
import { Suspense } from 'react';

const FactorsPage: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <FactorsTable />
  </Suspense>
);

export const dynamic = 'force-dynamic';

export default FactorsPage;
