import { FC } from 'react';
import { ISvgIconProps } from './interface';

const CheckIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="currentColor"
    >
      <path
        d="M5.87777 11.8271C5.48811 11.3737 4.81123 11.3277 4.3659 11.7245C3.92058 12.1212 3.87545 12.8104 4.26511 13.2638L8.01511 17.6275C8.43124 18.1117 9.16647 18.1259 9.60038 17.6581L18.7075 7.83995C19.1138 7.40194 19.0944 6.71149 18.6642 6.29781C18.234 5.88412 17.5559 5.90385 17.1496 6.34187L8.8517 15.2877L5.87777 11.8271Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default CheckIcon;
