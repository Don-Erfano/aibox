import { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@aibox/ui';
import { DropDownSelectProps, Option } from './interface';

const DropDownSelect: FC<DropDownSelectProps> = ({
  options,
  placeholder = 'همه',
  value,
  onChange,
  disabled = false,
  className = '',
  triggerSize = 'h-10 w-25',
}) => {
  return (
    <Select
      value={value}
      onValueChange={(val: string) => {
        if (onChange) onChange(val);
      }}
      disabled={disabled}
    >
      <SelectTrigger
        className={`
          ${triggerSize} ${className}
          border-none
          shadow-none
          focus:outline-none
          !text-zinc-600
          !px-2
          focus:ring-0 focus:border-none focus-visible:outline-none focus-visible:ring-0
           [&_svg]:!h-6 [&_svg]:!opacity-100 [&_svg]:!text-zinc-600 [&_svg]:!w-6 [&[data-state='closed']_svg]:!rotate-0
           [&[data-state='open']_svg]:!rotate-180 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-in-out
        `}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent side="bottom">
        {options.map((opt: Option) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            className={`

              [&[data-state='checked']]:bg-transparent
              [&[data-highlighted]]:bg-gray-200
              focus:outline-none
            `}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDownSelect;
