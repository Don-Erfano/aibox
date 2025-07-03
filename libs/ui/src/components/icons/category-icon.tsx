import { FC } from 'react';

import { ISvgIconProps } from './interface';

const CategoryIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      {...props}
    >
      <path
        d="M15.5836 9.16634H17.417C19.2503 9.16634 20.167 8.24967 20.167 6.41634V4.58301C20.167 2.74967 19.2503 1.83301 17.417 1.83301H15.5836C13.7503 1.83301 12.8336 2.74967 12.8336 4.58301V6.41634C12.8336 8.24967 13.7503 9.16634 15.5836 9.16634Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M4.58362 20.1663H6.41695C8.25028 20.1663 9.16695 19.2497 9.16695 17.4163V15.583C9.16695 13.7497 8.25028 12.833 6.41695 12.833H4.58362C2.75028 12.833 1.83362 13.7497 1.83362 15.583V17.4163C1.83362 19.2497 2.75028 20.1663 4.58362 20.1663Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.34"
        d="M5.50028 9.16634C7.52533 9.16634 9.16695 7.52472 9.16695 5.49967C9.16695 3.47463 7.52533 1.83301 5.50028 1.83301C3.47524 1.83301 1.83362 3.47463 1.83362 5.49967C1.83362 7.52472 3.47524 9.16634 5.50028 9.16634Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        opacity="0.34"
        d="M16.5003 20.1663C18.5253 20.1663 20.167 18.5247 20.167 16.4997C20.167 14.4747 18.5253 12.833 16.5003 12.833C14.4753 12.833 12.8336 14.4747 12.8336 16.4997C12.8336 18.5247 14.4753 20.1663 16.5003 20.1663Z"
        stroke="white"
        stroke-width="1.5"
        stroke-miterlimit="10"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CategoryIcon;
