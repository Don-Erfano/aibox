'use client';

import { NextPage } from 'next';
import { UserListPage } from '../../../components/pages/user';
import { Suspense } from 'react';

const UserList: NextPage = () => (
  <Suspense fallback={<div>در حال بارگذاری...</div>}>
    <UserListPage />
  </Suspense>
);
export const dynamic = 'force-dynamic';

export default UserList;
