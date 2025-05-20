import { FC } from 'react';

import { IDatePickerInput } from './types';

const DatePickerInput: FC<IDatePickerInput> = ({
  value,
  label,
  helperText,
  clearAction,
}) => {
  return (
    <></>
    // <BaseInput
    //   label={label}
    //   value={value}
    //   size="sm"
    //   helperText={helperText}
    //   onChange={(e) => e.preventDefault()}
    //   leftIcon={{
    //     icon: value && 'X',
    //     action: clearAction,
    //   }}
    // />
  );
};

export default DatePickerInput;
