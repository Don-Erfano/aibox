'use client';

import { NextPage } from 'next';
import { Suspense } from 'react';

import { TransactionsTable } from '@/components/pages/transactions';

const Fallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);

const TransactionsPage: NextPage = () => (
  <Suspense fallback={<Fallback />}>
    <TransactionsTable />
  </Suspense>
);

export const dynamic = 'force-dynamic';

export default TransactionsPage;
