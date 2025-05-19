'use client';

import { UserSetting } from '@/components/pages/info/user-setting';
import { Tab } from '@aibox/ui';
import { Tab as TabType } from '../../../../../../../libs/ui/src/components/tabs/types';
import { UserInfoProps } from '@/components/pages/info/type';
import { useGetUserInfo } from '@/services/user/info';

const UserInfo: React.FC<UserInfoProps> = ({ params }) => {
  const { id } = params;
  const { user } = useGetUserInfo({ id });

  const tabs: TabType[] = [
    {
      name: 'مشخصات کاربری',
      id: 'user-profile',
      content: <p>user-profile</p>,
      isDisabled: false,
    },
    {
      name: 'بسته‌های API',
      id: 'api-packages',
      content: <p>api-packages</p>,
      isDisabled: false,
    },
    {
      name: 'بسته‌های GPU',
      id: 'gpu-packages',
      content: <p>gpu-packages</p>,
      isDisabled: false,
    },
    {
      name: 'APIهای ارائه شده',
      id: 'provided-apis',
      content: <p>provided-apis</p>,
      isDisabled: false,
    },
    {
      name: 'تنظیمات',
      id: 'setting',
      content: user && <UserSetting userData={user} userId={id} />,
      isDisabled: false,
    },
    { name: 'توکن', id: 'token', content: 'token', isDisabled: true },
  ];

  return (
    <div className="p-10 pb-0">
      <Tab tabs={tabs} />
    </div>
  );
};

export default UserInfo;
