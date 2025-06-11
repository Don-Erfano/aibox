'use client';

import { use } from 'react';
import { NextPage } from 'next';
import { UserInfoPage } from '@/components/pages/user';
import type { UserInfoProps } from '@/components/pages/user/info';

const UserInfo: NextPage<UserInfoProps> = ({ params }) => {
  const { id } = use(params);

  return <UserInfoPage id={id} />;
};

export default UserInfo;
