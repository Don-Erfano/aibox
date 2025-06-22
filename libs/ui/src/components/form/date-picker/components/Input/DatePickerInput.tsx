import { FC } from 'react';

import { IDatePickerInput } from './types';
import { AIBInput } from '../../../input/input';
import { X } from 'lucide-react';

const DatePickerInput: FC<IDatePickerInput> = ({
  value,
  label,
  clearAction,
}) => {
  return (
    <AIBInput
      value={value}
      onChange={(e) => e.preventDefault()}
      label={label}
      endAdornment={
        value ? (
          <X onClick={clearAction} className="cursor-pointer" />
        ) : undefined
      }
    />
  );
};

export default DatePickerInput;
