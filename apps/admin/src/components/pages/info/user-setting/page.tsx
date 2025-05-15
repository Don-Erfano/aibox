import React, { FC } from 'react';
import UserAccessLevel from './components/user-access/page';
import ProviderShareField from './components/provider-share/page';
import UserStatusField from './components/user-status/page';

interface UserSettingProps {
  userData: any;
}

const UserSetting: FC<UserSettingProps> = ({ userData }) => {
  console.log(userData);
  return (
    <div className="flex flex-col mt-10 gap-12.5">
      <UserAccessLevel />
      <ProviderShareField />
      <UserStatusField />
    </div>
  );
};

export default UserSetting;
