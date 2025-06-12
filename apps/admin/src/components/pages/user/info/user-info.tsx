import { useGetUserInfo } from '@/services/user/info';
import { TabType, Tab } from '@aibox/ui';
import { FC } from 'react';
import { UserSetting } from './user-setting';
import UserInfoTab from '../../user-list/user-info-tab/user-info-tab';

const UserInfo: FC<{ id: string }> = ({ id }) => {
  const { user } = useGetUserInfo({ id });

  const tabs: TabType[] = [
    {
      name: 'مشخصات کاربری',
      id: 'user-profile',
      content: <UserInfoTab userId={id} />,
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
