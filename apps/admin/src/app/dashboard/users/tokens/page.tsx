'use client';

import { NextPage } from 'next';
import { UserTokenPage } from '@/components/pages/user-token';
import { Suspense } from 'react';

const UserToken: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <UserTokenPage />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default UserToken;
