import { FC } from 'react';
import { DefaultMessageProps } from './interface';
import { Checkbox } from '@aibox/ui';

const DefaultMessage: FC<DefaultMessageProps> = ({
  title_number,
  category_title,
  message,
  checked,
  onToggle,
}) => {
  const handleClick = () => {
    onToggle(!checked);
  };

  return (
    <div className="w-78 flex-shrink-0 flex flex-col space-y-2 p-3 h-63 border border-gray-500 rounded-lg">
      <div className="w-full flex justify-between items-center">
        <span className="w-full text-sm font-normal text-gray-500 whitespace-nowrap">
          {category_title} شماره {title_number}
        </span>
        <Checkbox
          className="cursor-pointer"
          checked={checked}
          onClick={handleClick}
        />
      </div>

      <div className="w-72 h-px bg-zinc-700" />

      <div
        className="
          relative
          h-43.5
          overflow-y-auto
          [scrollbar-width:thin]
          [scrollbar-color:#0d948240_transparent]
          [&::-webkit-scrollbar]:w-[2px]
          [&::-webkit-scrollbar-track]:bg-transparent
          [&::-webkit-scrollbar-thumb]:bg-teal-300
          [&::-webkit-scrollbar-thumb]:rounded-[8px]
        "
      >
        <p className="p-2 text-xs font-normal text-justify leading-normal text-gray-500">
          {message}
        </p>
      </div>
    </div>
  );
};

export default DefaultMessage;
