'use client';

import { Suspense } from 'react';
import nextDynamic from 'next/dynamic';

export const dynamic = 'force-dynamic';

const CollectionTable = nextDynamic(
  () => import('@/components/pages/collection').then((m) => m.CollectionTable),
  { ssr: false }
);

export default function CollectionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CollectionTable />
    </Suspense>
  );
}
