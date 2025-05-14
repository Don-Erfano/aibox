import { TabTitleProps } from '../types';

export const TabTitle: React.FC<TabTitleProps> = ({ children, disabled }) => {
  return (
    <p
      className={` group-focus:text-teal-600 group-data-[state=active]:text-teal-600 text-base font-medium inline-block whitespace-nowrap truncate text-ellipsis  ${
        disabled ? 'text-gray-400' : 'hover:text-teal-600 text-zinc-600'
      }`}
    >
      {children}
    </p>
  );
};
