import { FC } from 'react';
import { IIconButton } from './interface';

const IconButton: FC<IIconButton> = (props) => {
  return (
    <button
      className={`border border-transparent p-2 cursor-pointer
                     rounded-[14px] hover:bg-zinc-200/60
                   hover:text-teal-600 active:border active:border-teal-600
                     flex justify-center items-center aria-selected:bg-teal-600
                     aria-selected:text-white disabled:pointer-events-none disabled:text-gray-300`}
      {...props}
    />
  );
};

export default IconButton;
