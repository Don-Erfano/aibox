'use client';

import { Suspense } from 'react';
import { AddTicketPage } from '@/components/pages/ticketing';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddTicketPage />
    </Suspense>
  );
}
