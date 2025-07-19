'use client';

import { LogsTable } from '@/components/pages/ai-service/logs';
import { Suspense } from 'react';

const Fallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);
const AiServicesLogsPage = () => (
  <Suspense fallback={<Fallback />}>
    <LogsTable />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default AiServicesLogsPage;
