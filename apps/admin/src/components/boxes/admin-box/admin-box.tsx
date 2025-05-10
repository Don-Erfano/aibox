import { FC } from 'react';
import { AdminBoxStatusProps } from './interface';
import { AdminIcon } from '@aibox/ui';

const AdminBoxStatus: FC<AdminBoxStatusProps> = ({ isAdmin }) => {
  return (
    <div className=" flex items-center space-x-2 text-sm">
      {isAdmin ? (
        <>
          <AdminIcon />
          <p className="text-black">ادمین</p>
        </>
      ) : (
        <p className="text-black ">کاربر</p>
      )}
    </div>
  );
};
export default AdminBoxStatus;
