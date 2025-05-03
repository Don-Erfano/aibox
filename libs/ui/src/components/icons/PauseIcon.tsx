import { FC } from 'react';
import { ISvgIconProps } from './interface';

const PauseIcon: FC<ISvgIconProps> = () => {
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
          d="M9.86723 18.0384C9.86723 19.3824 8.77759 20.472 7.43361 20.472C6.08964 20.472 5 19.3824 5 18.0384V5.43361C5 4.08964 6.08964 3 7.43361 3C8.77759 3 9.86723 4.08964 9.86723 5.43361V18.0384Z"
          fill="black"
        />
        <path
          d="M19.0005 18.0384C19.0005 19.3824 17.9109 20.472 16.5669 20.472C15.2229 20.472 14.1333 19.3824 14.1333 18.0384V5.43361C14.1337 4.08964 15.2233 3 16.5669 3C17.9109 3 19.0005 4.08964 19.0005 5.43361V18.0384Z"
          fill="black"
        />
      </g>
    </svg>
  );
};

export default PauseIcon;
