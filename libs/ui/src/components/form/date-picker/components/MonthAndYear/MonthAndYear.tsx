import { FC } from 'react';
import clsx from 'clsx';

import { jalaliMonth } from '../../constants';
import { useDatePickerProvider } from '../../providers/useDatePickerProvider';
import { ECalendarState } from '../../types';
import { Button } from '../../../button';

const MonthAndYear: FC = () => {
  const { setCalendarState, today, currentDate, setCurrentDate } =
    useDatePickerProvider();
  const sepratedToday = today.split('/');

  const handleCalendarState = () => {
    setCalendarState(ECalendarState.DAY);
  };

  return (
    <div className="flex h-[372px] w-[304px] flex-col justify-between gap-3">
      <div className="grid grid-cols-3 gap-2 px-5">
        {jalaliMonth.map((month, i) => (
          <div
            key={i}
            className={clsx(
              `flex cursor-pointer items-center justify-center rounded-lg px-1 text-[14px] font-normal
              py-2 hover:bg-teal-600/25 aria-selected:bg-teal-600 aria-selected:text-white w-20`,
              {
                'border border-teal-600': Number(sepratedToday[1]) === i + 1,
                'text-white': currentDate.month === i + 1,
              }
            )}
            aria-selected={currentDate.month === i + 1}
            onClick={() => {
              setCurrentDate({
                ...currentDate,
                month: i + 1,
              });
            }}
          >
            <p className="body-3">{month}</p>
          </div>
        ))}
      </div>
      <hr className="border-teal-600" />
      <div className="grid h-[200px] grid-cols-4 gap-2 overflow-auto text-center">
        {Array.from(Array(200)).map((_, i) => (
          <div
            key={i}
            className={clsx(
              `flex cursor-pointer items-center justify-center rounded-lg px-1 text-[14px] font-normal
              py-2 hover:bg-teal-600/25 aria-selected:bg-teal-600 aria-selected:text-white w-[60px]`,
              {
                'outline outline-teal-600':
                  Number(sepratedToday[0]) === i + 1357,
                'text-white': currentDate.year === i + 1357,
              }
            )}
            aria-selected={currentDate.year === i + 1357}
            onClick={() => {
              setCurrentDate({
                ...currentDate,
                year: i + 1357,
              });
            }}
          >
            <p className="body-3">{i + 1357}</p>
          </div>
        ))}
      </div>
      <div>
        <hr className="border-teal-600" />
        <div className="flex justify-center py-4 gap-5">
          <Button onClick={handleCalendarState} size="default" isFilled>
            تایید
          </Button>
          <Button onClick={handleCalendarState} size="default">
            بازگشت
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MonthAndYear;
