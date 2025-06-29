import { FC } from 'react';

import { Day } from '..';
import { IDays } from './types';
import { getDaysOfCurrentMonth } from '../../helpers/GetMonth';
import { useDatePickerProvider } from '../../providers/useDatePickerProvider';
import moment from 'moment-jalaali';

const Days: FC<IDays> = ({ onClick }) => {
  const { currentDate, datePickerValue, today, max, min } =
    useDatePickerProvider();
  return (
    <div className={'grid w-[304px] grid-cols-7'}>
      {getDaysOfCurrentMonth(currentDate).map((item, i) =>
        !item ? (
          <div key={i} />
        ) : (
          <Day
            key={i}
            day={item}
            selectedDate={datePickerValue}
            today={today}
            min={min ? moment(min).format('jYYYY/jMM/jDD') : ''}
            max={max ? moment(max).format('jYYYY/jMM/jDD') : ''}
            onClick={onClick}
          />
        )
      )}
    </div>
  );
};
export default Days;
