import { NextPage } from 'next';
import { FaqPage } from '@/components/pages/support/faq';
import { Suspense } from 'react';

const Faq: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <FaqPage />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default Faq;
