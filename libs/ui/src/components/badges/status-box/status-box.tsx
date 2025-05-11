import { FC } from 'react';
import { StatusBoxProps } from './interface';

const StatusBox: FC<StatusBoxProps> = ({ isActive }) => {
  return (
    <div className="flex items-center space-x-2">
      {isActive ? (
        <>
          <div className="w-4 h-4 rounded-full bg-green-600" />
          <p className="text-green-600">فعال</p>
        </>
      ) : (
        <>
          <div className="w-4 h-4 rounded-full bg-red-600" />
          <p className="text-red-600">غیرفعال</p>
        </>
      )}
    </div>
  );
};

export default StatusBox;
