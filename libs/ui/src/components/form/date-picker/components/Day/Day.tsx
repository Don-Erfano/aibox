import clsx from 'clsx';
import { FC } from 'react';

import { ISelectableDay } from './types';
import moment from 'moment-jalaali';

const WeekDay: FC<ISelectableDay> = ({
  day: { WeekDay, day, month, year },
  selectedDate,
  onClick,
  today,
  max,
  min,
}) => {
  console.log(max);
  const minimumDate = min
    ? new Date(moment(min).toLocaleString()).getTime() >
      new Date(
        moment(
          `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
            +day.j > 10 ? day.j : `0${day.j}`
          }`
        ).toLocaleString()
      ).getTime()
    : false;

  const maximumDate = max
    ? new Date(moment(max).toLocaleString()).getTime() <
      new Date(
        moment(
          `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
            +day.j > 10 ? day.j : `0${day.j}`
          }`
        ).toLocaleString()
      ).getTime()
    : false;

  const isToday =
    today ===
    `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
      +day.j > 10 ? day.j : `0${day.j}`
    }`;

  const inRange =
    selectedDate.length === 2 &&
    new Date(moment(selectedDate[0]).toLocaleString()).getTime() <
      new Date(
        moment(
          `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
            +day.j > 10 ? day.j : `0${day.j}`
          }`
        ).toLocaleString()
      ).getTime() &&
    new Date(moment(selectedDate[1]).toLocaleString()).getTime() >
      new Date(
        moment(
          `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
            +day.j > 10 ? day.j : `0${day.j}`
          }`
        ).toLocaleString()
      ).getTime();

  const isSelected =
    selectedDate[0] ===
      `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
        +day.j > 10 ? day.j : `0${day.j}`
      }` ||
    selectedDate[1] ===
      `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
        +day.j > 10 ? day.j : `0${day.j}`
      }`;

  const weekEndClasses = (commonClass: string) =>
    clsx(commonClass, {
      'text-red-600': WeekDay.value === 5 && !isSelected,
      'text-white': WeekDay.value === 5 && isSelected,
    });

  return (
    <div
      className="size-10 p-0.5 aria-disabled:pointer-events-none aria-disabled:text-gray-400"
      onClick={() =>
        onClick(
          `${year.j}/${+month.j > 10 ? month.j : `0${month.j}`}/${
            +day.j > 10 ? day.j : `0${day.j}`
          }`
        )
      }
      aria-disabled={minimumDate || maximumDate}
    >
      <div
        className={clsx(
          `flex items-center justify-center size-9 cursor-pointer flex-col rounded-lg px-0.5 py-0.5
          hover:bg-teal-600/25 aria-selected:bg-teal-600 aria-checked:bg-teal-600/12
          aria-selected:text-white`,
          {
            'border border-teal-600': isToday,
          }
        )}
        aria-selected={isSelected}
        aria-checked={inRange}
      >
        <p className={weekEndClasses('text-[14px] text-center leading-5')}>
          {day.j}
        </p>
        {/* <div className={weekEndClasses('flex w-full justify-between gap-1')}>
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
        </div> */}
      </div>
    </div>
  );
};

export default WeekDay;
