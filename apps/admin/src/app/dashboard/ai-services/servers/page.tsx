import { Servers } from '@/components/pages/servers';
import { Suspense } from 'react';

const Fallback = () => (
  <div className="flex items-center justify-center h-screen">
    <p>Loading...</p>
  </div>
);
export default function ServersPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <Servers />
    </Suspense>
  );
}
export const dynamic = 'force-dynamic';
