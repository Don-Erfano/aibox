import { FC } from 'react';
import { ISvgIconProps } from './interface';

const WidthdrawIcon: FC<ISvgIconProps> = (props) => {
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
        d="M7.4 2.66724L2 6.85837L5 6.85837C5 14.015 10.8068 14.8407 14 14.6419C12.389 14.3414 9.8 14.2018 9.8 6.85837L12.8 6.85837L7.4 2.66724Z"
        stroke="#990099"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 0.667155C16 0.298965 15.6418 0.000488281 15.2 0.000488281H0.8C0.358172 0.000488281 0 0.298965 0 0.667155C0 1.03534 0.358172 1.33382 0.8 1.33382H15.2C15.6418 1.33382 16 1.03534 16 0.667155Z"
        fill="#990099"
      />
    </svg>
  );
};
export default WidthdrawIcon;
