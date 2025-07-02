import { useGetUserInfo } from '@/services/user/info';
import { TabType, Tab } from '@aibox/ui';
import { FC } from 'react';
import { UserSetting } from './user-setting';
import { GpuPackage } from './gpu-package';
import { ApiPackage } from './api-package';
import UserInfoTab from '../../user-list/user-info-tab/user-info-tab';
import UserTransactionPage from '../user-transaction/user-transaction';
import { strings } from '@/constant';

const UserInfo: FC<{ id: string }> = ({ id }) => {
  const { user } = useGetUserInfo({ id });

  const tabs: TabType[] = [
    {
      name: strings.userInfo,
      id: 'user-profile',
      content: <UserInfoTab userId={id} />,
      isDisabled: false,
    },
    {
      name: strings.apiPackages,
      id: 'api-packages',
      content: <ApiPackage id={id} />,
      isDisabled: false,
    },
    {
      name: strings.gpuPackages,
      id: 'gpu-packages',
      content: <GpuPackage id={id} />,
      isDisabled: false,
    },
    {
      name: strings.myApi,
      id: 'provided-apis',
      content: <p>provided-apis</p>,
      isDisabled: false,
    },
    {
      name: strings.finance,
      id: 'finance',
      content: <UserTransactionPage userId={id} />,
      isDisabled: false,
    },
    {
      name: strings.setting,
      id: 'setting',
      content: user && <UserSetting userData={user} userId={id} />,
      isDisabled: false,
    },
    { name: strings.token, id: 'token', content: 'token', isDisabled: true },
  ];

  return (
    <div className="p-10 pb-0">
      <Tab tabs={tabs} />
    </div>
  );
};

export default UserInfo;
