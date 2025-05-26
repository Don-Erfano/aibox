import { FC } from 'react';
import { ISvgIconProps } from './interface';

const AddIcon: FC<ISvgIconProps> = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g>
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M10.8695 10.8696V5.88043C10.8695 5.39418 11.2637 5 11.75 5C12.2362 5 12.6304 5.39418 12.6304 5.88043V10.8696H17.6196C18.1058 10.8696 18.5 11.2638 18.5 11.75C18.5 12.2363 18.1058 12.6305 17.6196 12.6305H12.6304V17.6196C12.6304 18.1058 12.2362 18.5 11.75 18.5C11.2637 18.5 10.8695 18.1058 10.8695 17.6196V12.6305H5.88044C5.39418 12.6305 5 12.2363 5 11.75C5 11.2638 5.39418 10.8696 5.88044 10.8696H10.8695Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default AddIcon;
