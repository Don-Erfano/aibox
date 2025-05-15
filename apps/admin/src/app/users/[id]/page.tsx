import { UserSetting } from '@/components/pages/info/user-setting';

interface UserInfoProps {
  params: Promise<{ id: string }>;
}

const userData = {
  accessLevel: 'admin',
  providerShare: '80',
  status: 'active',
};

const UserInfo: React.FC<UserInfoProps> = async ({ params }) => {
  const Tabs = [
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

  const { id } = await params;

  return (
    <div>
      {/* <Tab/> */}
      <UserSetting userData={userData} />
    </div>
  );
};

export default UserInfo;
