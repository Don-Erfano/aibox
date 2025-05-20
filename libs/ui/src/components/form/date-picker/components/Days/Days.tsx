import { FC } from 'react';

import { Day } from '..';
import { IDays } from './types';
import { getDaysOfCurrentMonth } from '../../helpers/GetMonth';
import { useDatePickerProvider } from '../../providers/useDatePickerProvider';

const Days: FC<IDays> = ({ onClick }) => {
  const { currentDate, datePickerValue, today } = useDatePickerProvider();
  return (
    <div className={'grid w-[360px] grid-cols-7'}>
      {getDaysOfCurrentMonth(currentDate).map((item, i) =>
        !item ? (
          <div key={i} />
        ) : (
          <Day
            key={i}
            day={item}
            selectedDate={datePickerValue}
            today={today}
            onClick={onClick}
          />
        )
      )}
    </div>
  );
};
export default Days;
