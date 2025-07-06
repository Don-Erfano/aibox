import { FC } from 'react';

import { IDatePickerInput } from './types';
import moment from 'moment-jalaali';
import { Calendar, X } from 'lucide-react';

const DatePickerInput: FC<IDatePickerInput> = ({
  value,
  label,
  handleChange,
  clearAction,
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
            onChange={(e) =>
              handleChange([e.target.value.replaceAll('-', '/'), value[1]])
            }
            onClick={(e) => e.preventDefault()}
            name="from"
            type="date"
            className="outline-0 w-fit cursor-pointer"
          />
        </div>
        <span>-</span>
        <div className="flex w-full">
          <div className="w-full">
            <Calendar />
          </div>
          <input
            value={value[1]?.replaceAll('/', '-')}
            onChange={(e) => {
              if (
                new Date(
                  moment(e.target.value.replaceAll('-', '/')).format()
                ).getTime() > new Date(moment(value[0]).format()).getTime()
              ) {
                handleChange([value[0], e.target.value.replaceAll('-', '/')]);
              }
            }}
            name="to"
            onClick={(e) => e.preventDefault()}
            type="date"
            className="outline-0 w-fit cursor-pointer"
          />
        </div>
        {value?.some((v) => v) && <X onClick={clearAction} />}
      </div>
    </div>
  );
};

export default DatePickerInput;
