'use client';

import { UserSetting } from '@/components/pages/info/user-setting';
import { Tab } from '@aibox/ui';
import { Tab as TabType } from '../../../../../../libs/ui/src/components/tabs/types';
import { userData } from '@/constant/data';
import { UserInfoProps } from '@/components/pages/info/type';
import { useQuery } from '@/hooks/useQery';

// userid: 639eed49-922d-40b5-98c8-be4cb132f043

const UserInfo: React.FC<UserInfoProps> = ({ params }) => {
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
      content: <UserSetting userData={userData} />,
      isDisabled: false,
    },
    { name: 'توکن', id: 'token', content: 'token', isDisabled: true },
  ];

  return (
    <div className="p-10">
      <Tab tabs={tabs} />
    </div>
  );
};

export default UserInfo;
