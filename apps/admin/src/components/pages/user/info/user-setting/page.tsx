import React, { FC } from 'react';
import UserAccessLevel from './components/user-access/page';
import ProviderShareField from './components/provider-share/page';
import UserStatusField from './components/user-status/page';
import type { UserSettingProps } from './types';
import { useGetProviderShare } from '@/services/user/info/user-setting/provider-share';

const UserSetting: FC<UserSettingProps> = ({ userData, userId }) => {
  const userLevel = userData.is_admin
    ? 'admin'
    : userData.is_staff
    ? 'operator'
    : 'user';

  const { providerShareData } = useGetProviderShare({ id: userId });

  return (
    <div className="flex flex-col mt-10 gap-12.5">
      <UserAccessLevel userLevel={userLevel} userId={userId} />
      <ProviderShareField data={providerShareData} userId={userId} />
      <UserStatusField status={userData.is_active} userId={userId} />
    </div>
  );
};

export default UserSetting;
