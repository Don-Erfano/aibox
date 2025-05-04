import { ISvgIconProps } from './interface';
import { FC } from 'react';

const BookmarkIcon: FC<ISvgIconProps> = () => {
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
          d="M4.60573 2H18.3943C18.7296 2 19 2.27117 19 2.60464V21.3954C19 21.73 18.7283 22 18.3943 22C18.2266 22 18.0749 21.9316 17.9648 21.8217L11.4841 16.2492L5.00098 21.8522C4.7489 22.0696 4.36711 22.0428 4.14807 21.7911C4.04895 21.6775 4.00122 21.5358 4.00122 21.3966H4V2.60464C4 2.27117 4.27166 2 4.60573 2ZM17.5 3.5H5.5V19.5L11 14.5C11.2227 14.3021 11.5641 14.2948 11.7966 14.4951L17.5 19.5V3.5Z"
          fill="black"
        />
      </g>
    </svg>
  );
};
export default BookmarkIcon;
