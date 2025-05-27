import { FC } from 'react';

import { IDatePickerInput } from './types';
import { AIBInput } from '../../../input/input';

const DatePickerInput: FC<IDatePickerInput> = ({
  value,
  label,
  helperText,
  clearAction,
}) => {
  return <AIBInput value={value} onChange={(e) => e.preventDefault()} />;
};

export default DatePickerInput;
