import moment from 'moment-jalaali';
import { gregorianDateFormat, jalaliDateFormat, week_days } from '../constants';
import { IDate, IDaysOfCurrentMonth } from '../types';
import { getDaysOfMonth } from './getDaysOfMonth';

export const getDaysOfCurrentMonth = ({ month, year }: IDaysOfCurrentMonth) => {
  const m = moment(`${year}/${month}/1`, jalaliDateFormat);
  const DaysOfSelectedMonth = getDaysOfMonth({
    month,
    year,
  });

  const MonthDaysInRow = Array.from(Array(DaysOfSelectedMonth)).map(
    (_, index) => {
      const gregorianDate = moment(
        `${year}/${month}/${index + 1}`,
        jalaliDateFormat
      )
        .format(gregorianDateFormat)
        .split('-');

      const hijriDate = Intl.DateTimeFormat('ar-SA-islamic-umalqura')
        .format(
          new Date(
            moment(`${year}/${month}/${index}`, jalaliDateFormat).format(
              gregorianDateFormat
            )
          )
        )
        .split('/');

      return {
        day: {
          j: String(index + 1),
          g: gregorianDate[2],
          h: hijriDate[0],
        },
        WeekDay: week_days[(m.weekday() + index) % 7],
        month: {
          j: String(month),
          g: gregorianDate[1],
          h: hijriDate[1],
        },
        year: {
          j: String(year),
          g: gregorianDate[0],
          h: hijriDate[2],
        },
      };
    }
  );

  const shiftDaysToStartPos = Array.from(
    Array(MonthDaysInRow[0].WeekDay.value + 1)
  );

  const MonthDays: Array<undefined | IDate> = [
    ...shiftDaysToStartPos,
    ...MonthDaysInRow,
  ];

  return MonthDays;
};
