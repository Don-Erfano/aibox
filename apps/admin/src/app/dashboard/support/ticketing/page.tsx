'use client';

import { NextPage } from 'next';
import TicketingTab from '@/components/pages/ticketing/page';
import { Suspense } from 'react';

const Ticketing: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <TicketingTab />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default Ticketing;
