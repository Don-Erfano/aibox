import { NextPage } from 'next';
import MessagesPage from '@/components/pages/messages/messages';
import { Suspense } from 'react';

const Messages: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <MessagesPage />
  </Suspense>
);

export const dynamic = 'force-dynamic';

export default Messages;
