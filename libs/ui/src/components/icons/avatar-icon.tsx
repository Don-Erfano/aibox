import { FC } from 'react';
import { ISvgIconProps } from './interface';

const AvatarIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      {...props}
    >
      <circle cx="16" cy="16" r="16" fill="#D1D5DB" />
      <g clip-path="url(#clip0_13802_201073)">
        <path
          d="M16.0003 19.4785C6.95678 19.4785 3.47852 28.8698 3.47852 29.9133V36.1742H28.522V29.9133C28.522 28.522 25.0437 19.4785 16.0003 19.4785Z"
          fill="#F5F5F5"
        />
        <path
          d="M16.0001 16.6956C19.4579 16.6956 22.261 13.8925 22.261 10.4347C22.261 6.97691 19.4579 4.17383 16.0001 4.17383C12.5423 4.17383 9.73926 6.97691 9.73926 10.4347C9.73926 13.8925 12.5423 16.6956 16.0001 16.6956Z"
          fill="#F5F5F5"
        />
      </g>
      <defs>
        <clipPath id="clip0_13802_201073">
          <rect width="32" height="32" rx="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default AvatarIcon;
