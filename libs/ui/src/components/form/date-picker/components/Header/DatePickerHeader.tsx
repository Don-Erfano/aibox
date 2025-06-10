import { FC } from 'react';

import HeaderAction from '../HeaderAction/HeaderAction';
import { getDaysOfCurrentMonth } from '../../helpers/GetMonth';
import { jalaliMonth } from '../../constants';
import { useDatePickerProvider } from '../../providers/useDatePickerProvider';
import { ECalendarState } from '../../types';
import { useCalendar } from './useCalendarActions';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

const DatePickerHeader: FC = () => {
  const { currentDate, setCurrentDate, setCalendarState } =
    useDatePickerProvider();

  const {
    onClickNextMonth,
    onClickNextYear,
    onClickPreviousYear,
    onClickPrevioustMonth,
  } = useCalendar({ setCurrentDate, currentDate });

  const firstDayOfMonth = getDaysOfCurrentMonth(currentDate).filter(
    (item) => !!item
  )[0];
  const month = firstDayOfMonth?.month;
  const year = firstDayOfMonth?.year;
  // const hijirMonthIndex = Number(toEnDigit(month.h).split('')[0]);
  // const gregorianMonthIndex = Number(month.g);

  // const hijriTemplate =
  //   hijiMonthes[hijirMonthIndex - 1] +
  //   ' - ' +
  //   hijiMonthes[hijirMonthIndex] +
  //   ' - ' +
  //   year.h.replace('هـ', '');

  // const gregorianTamplate =
  //   georgianMonth[gregorianMonthIndex - 1] +
  //   ' - ' +
  //   (georgianMonth[gregorianMonthIndex] || georgianMonth[0]) +
  //   ' ' +
  //   year.g;

  return (
    <div className="flex justify-between items-center gap-2 mb-4">
      <HeaderAction onClick={onClickPrevioustMonth}>
        <ChevronRight strokeWidth={1.5} />
      </HeaderAction>
      <HeaderAction onClick={onClickPreviousYear}>
        <ChevronsRight strokeWidth={1.5} />
      </HeaderAction>
      <div className="flex gap-0.5 flex-col items-center">
        <p
          className="text-[16px] font-medium w-fit cursor-pointer rounded-lg px-2 text-center
            text-teal-600 hover:bg-info-200 leading-5 mb-0.5"
          onClick={() => setCalendarState(ECalendarState.MONTH)}
        >
          {jalaliMonth[Number(month.j) - 1] + ' ' + year.j}
        </p>
        {/* <p className="text-center font-light text-[12px] text-grey-500 leading-5 text-gray-600">
          {gregorianTamplate}
        </p>
        <p className="text-center font-light text-[12px] text-grey-500 leading-5 text-gray-600">
          {hijriTemplate}
        </p> */}
      </div>
      <HeaderAction onClick={onClickNextYear}>
        <ChevronsLeft strokeWidth={1.5} />
      </HeaderAction>
      <HeaderAction onClick={onClickNextMonth}>
        <ChevronLeft strokeWidth={1.5} />
      </HeaderAction>
    </div>
  );
};

export default DatePickerHeader;
