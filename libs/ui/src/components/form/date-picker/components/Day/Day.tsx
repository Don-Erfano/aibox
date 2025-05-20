import clsx from 'clsx';
import { FC } from 'react';

import { ISelectableDay } from './types';

const WeekDay: FC<ISelectableDay> = ({
  day: { WeekDay, day, month, year },
  selectedDate,
  onClick,
  today,
}) => {
  const isToday = today === `${year.j}/${month.j}/${day.j}`;
  const isSelected = selectedDate === `${year.j}/${month.j}/${day.j}`;

  const weekEndClasses = (commonClass: string) =>
    clsx(commonClass, {
      'text-red-600': WeekDay.value === 5 && !isSelected,
      'text-white': WeekDay.value === 5 && isSelected,
    });

  return (
    <div
      className="size-12 p-0.5"
      onClick={() => onClick(`${year.j}/${month.j}/${day.j}`)}
    >
      <div
        className={clsx(
          `flex size-11 cursor-pointer flex-col rounded-lg px-2 py-1
          hover:bg-teal-600/25 aria-selected:bg-teal-600
          aria-selected:text-white`,
          {
            'border border-teal-600': isToday,
          }
        )}
        aria-selected={isSelected}
      >
        <p className={weekEndClasses('text-[14px] text-center leading-s1')}>
          {day.j}
        </p>
        <div className={weekEndClasses('flex w-full justify-between gap-1')}>
          <p
            className={weekEndClasses(
              '!font-sans text-[9px] leading-[16px] font-light -mt-[1px]'
            )}
          >
            {day.g}
          </p>
          <p
            className={weekEndClasses(
              'font-sans text-[9px] leading-[16px] font-light'
            )}
          >
            {day.h}
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeekDay;
