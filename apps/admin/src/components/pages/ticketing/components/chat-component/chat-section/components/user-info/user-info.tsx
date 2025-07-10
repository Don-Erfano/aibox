import { FC } from 'react';
import Link from 'next/link';
import { UserInfoProps } from './interface';
import { User } from 'lucide-react';
import { USERS_ROUTES } from '@/routes';

const UserInfo: FC<UserInfoProps> = ({
  userName,
  userEmail,
  userAvatar,
  user,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-6  mb-4">
      <div className="w-20 h-20 rounded-full bg-gray-300 border-2 border-gray-400 flex items-center justify-center overflow-hidden mb-3">
        {userAvatar ? (
          <img
            src={userAvatar}
            alt={userName}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-10 h-10 text-gray-500" />
        )}
      </div>

      <h3 className="text-lg font-medium text-gray-800 mb-1">{userName}</h3>

      <Link
        href={`${USERS_ROUTES.LIST}/${user}`}
        className="text-sm text-teal-600 hover:text-teal-700 transition-colors mb-3"
      >
        {userEmail}
      </Link>
    </div>
  );
};
export default UserInfo;
