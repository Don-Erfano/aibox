'use client';

import moment from 'moment-jalaali';
import { FC, useEffect, useState } from 'react';

import { ECalendarState, IDatePicker } from './types';
import MonthAndYear from './components/MonthAndYear/MonthAndYear';
import { DatePickerContext } from './providers/DatePickerProvider';
import { Days, Header, WeekDays } from './components';
import { jalaliToDateTime } from './helpers/convertors';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover/popover';
import DatePickerInput from './components/Input/DatePickerInput';

const CustomDatePicker: FC<IDatePicker> = ({
  onChange,
  value,
  label,
  isMulti,
}) => {
  const today = moment(new Date()).format('jYYYY/jM/jD');
  const [show, setShow] = useState(false);
  const [datePickerValue, SetDatePickerValue] = useState<string[]>(['', '']);
  const [calendarState, setCalendarState] = useState<ECalendarState>(
    ECalendarState.DAY
  );
  const [currentDate, setCurrentDate] = useState({
    year: +today.split('/')[0],
    month: +today.split('/')[1],
  });

  useEffect(() => {
    onChange(datePickerValue.map((d) => jalaliToDateTime(d)));
  }, [datePickerValue, onChange, value]);

  useEffect(() => {
    SetDatePickerValue([moment(value).format('jYYYY/jM/jD') || '']);
  }, [!!value]);

  useEffect(() => {
    setCalendarState(ECalendarState.DAY);
  }, [show === true]);

  const clearAction = () => {
    SetDatePickerValue(['']);
  };

  const toggleShow = () => {
    setShow(!show);
  };

  const handleChangeDate = (e: string) => {
    if (isMulti) {
      if (datePickerValue.length === 2) {
        SetDatePickerValue([e]);
      } else if (datePickerValue.length === 1) {
        if (
          new Date(moment(e).toLocaleString()).getTime() >
          new Date(moment(datePickerValue[0]).toLocaleString()).getTime()
        ) {
          SetDatePickerValue([datePickerValue[0], e]);
        } else {
          SetDatePickerValue([e]);
        }
      } else {
        SetDatePickerValue([e]);
      }
    } else {
      SetDatePickerValue([e]);
    }
  };

  return (
    <DatePickerContext.Provider
      value={{
        currentDate,
        datePickerValue,
        setCurrentDate,
        setCalendarState,
        today,
      }}
    >
      <Popover open={show} onOpenChange={toggleShow}>
        <PopoverTrigger>
          <DatePickerInput
            value={datePickerValue.join(' - ')}
            label={label}
            clearAction={clearAction}
          />
        </PopoverTrigger>
        <PopoverContent>
          {calendarState === ECalendarState.DAY ? (
            <>
              <Header />
              <WeekDays />
              <Days onClick={handleChangeDate} />
            </>
          ) : calendarState === ECalendarState.MONTH ? (
            <MonthAndYear />
          ) : null}
        </PopoverContent>
      </Popover>
    </DatePickerContext.Provider>
  );
};

CustomDatePicker.displayName = 'DatePicker';
export default CustomDatePicker;
