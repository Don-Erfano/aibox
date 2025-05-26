import { FC } from 'react';
import { ISvgIconProps } from './interface';

const DeleteIcon: FC<ISvgIconProps> = (props) => {
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
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.4323 12.2856L17.7625 16.6157C18.0791 16.9324 18.0791 17.4458 17.7625 17.7625C17.4458 18.0791 16.9324 18.0791 16.6157 17.7625L12.2856 13.4323L7.95542 17.7625C7.63876 18.0792 7.12535 18.0792 6.80868 17.7625C6.49202 17.4458 6.49202 16.9324 6.80868 16.6158L11.1389 12.2856L6.80854 7.95528C6.49188 7.63861 6.49188 7.1252 6.80854 6.80854C7.1252 6.49188 7.63861 6.49188 7.95528 6.80854L12.2856 11.1389L16.6159 6.80856C16.9325 6.49189 17.446 6.49189 17.7626 6.80856C18.0793 7.12522 18.0793 7.63863 17.7626 7.95529L13.4323 12.2856Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};

export default DeleteIcon;
