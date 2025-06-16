import { FC } from 'react';
import { ISvgIconProps } from './interface';

const DepositIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M8.6 13.3335L14 9.14236L11 9.14236C11 1.98569 5.1932 1.16004 2 1.35882C3.611 1.65938 6.2 1.79889 6.2 9.14236L3.2 9.14236L8.6 13.3335Z"
        stroke="#267FE5"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 15.3337C16 14.9655 15.6418 14.667 15.2 14.667L0.8 14.667C0.358172 14.667 0 14.9655 0 15.3337C0 15.7018 0.358172 16.0003 0.8 16.0003L15.2 16.0003C15.6418 16.0003 16 15.7018 16 15.3337Z"
        fill="#267FE5"
      />
    </svg>
  );
};
export default DepositIcon;
