import { ISvgIconProps } from './interface';
import { FC } from 'react';

const EditIcon: FC<ISvgIconProps> = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g>
        <path
          d="M21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H11"
          stroke="black"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.3973 5.16575C21.5895 5.45687 21.5574 5.85248 21.3012 6.10876L12.1088 15.3011C12.0145 15.3954 11.8969 15.4628 11.768 15.4965L7.93955 16.4965C7.81468 16.5291 7.68597 16.5284 7.56504 16.4976C7.43647 16.4649 7.3167 16.3982 7.21968 16.3011C7.03141 16.1129 6.95707 15.8389 7.02436 15.5813L8.02436 11.7528C8.05383 11.64 8.10912 11.5286 8.18561 11.4412L17.4121 2.21967C17.4928 2.13891 17.5901 2.07846 17.696 2.04163C17.7745 2.01432 17.8577 2 17.9424 2C18.1413 2 18.3321 2.07902 18.4727 2.21967L21.3012 5.0481C21.3378 5.08471 21.3698 5.12416 21.3973 5.16575ZM19.7102 5.57843L17.9424 3.81066L9.42423 12.3288L8.79924 14.7216L11.192 14.0966L19.7102 5.57843Z"
          fill="black"
        />
        <path d="M19 1L22.5 4.5" stroke="black" stroke-linecap="round" />
      </g>
    </svg>
  );
};
export default EditIcon;
