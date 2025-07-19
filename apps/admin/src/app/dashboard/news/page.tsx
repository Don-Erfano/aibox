'use client';

import { News } from '@/components/pages/news';
import { Suspense } from 'react';

export default function NewsPage() {
  return (
    <Suspense fallback={<div>در حال بارگذاری...</div>}>
      <News />
    </Suspense>
  );
}

export const dynamic = 'force-dynamic';
