'use client';

import { NextPage } from 'next';

import { LoginPage } from '@/components/pages/login';
import { Tab } from '@aibox/ui';
import { Tab as TabType } from '../../../../../libs/ui/src/components/tabs/types';

const Login: NextPage = () => {
  const tabs: TabType[] = [
    { name: 'test1', id: 'test1', content: <p>test1</p>, isDisabled: false },
    { name: 'test2', id: 'test2', content: <p>test2</p>, isDisabled: false },
  ];
  return (
    <div className="flex flex-col">
      <Tab tabs={tabs} />
      <LoginPage />;
    </div>
  );
};

export default Login;
