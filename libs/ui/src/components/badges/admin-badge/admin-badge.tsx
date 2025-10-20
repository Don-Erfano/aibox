import { FC } from 'react';

import { AdminBoxStatusProps } from './interface';
import { AdminIcon } from '../../icons';

const AdminBadge: FC<AdminBoxStatusProps> = ({ isAdmin }) => {
  return (
    <div className="flex items-center space-x-2 text-sm text-zinc-700">
      {isAdmin ? (
        <>
          <AdminIcon />
          <p>ادمین</p>
        </>
      ) : (
        <p>کاربر</p>
      )}
    </div>
  );
};
export default AdminBadge;
