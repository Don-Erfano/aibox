import { FC } from 'react';
import { IDatePickerInput } from './types';
import { Calendar, X } from 'lucide-react';

const DatePickerSingleInput: FC<IDatePickerInput> = ({
  clearAction,
  handleChange,
  value,
  label,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full cursor-pointer">
      <span>{label}</span>
      <div className="flex items-center justify-between gap-2 w-full border border-gray-500 px-2 py-3 rounded-sm">
        <div className="flex w-full">
          <div className="w-full">
            <Calendar />
          </div>
          <input
            value={value[0]?.replaceAll('/', '-')}
            onChange={(e) => {
              handleChange([e.target.value.replaceAll('-', '/'), value[1]]);
            }}
            onClick={(e) => e.preventDefault()}
            name="date"
            type="date"
            className="outline-0 w-fit cursor-pointer"
          />
        </div>
        {value.some((v) => v) && <X onClick={clearAction} />}
      </div>
    </div>
  );
};

export default DatePickerSingleInput;
