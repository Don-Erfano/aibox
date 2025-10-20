'use client';

import { useEffect, useState } from 'react';
import moment from 'moment-jalaali';
import { Calendar as CalendarIcon } from 'lucide-react';

import { AIBInput } from '../input';
import { Button } from '../button';
import { Calendar } from '../../calendar';
import { DateTimePickerProps } from './interface';
import { TimePicker } from './time-picker';
import { Popover, PopoverContent, PopoverTrigger } from '../../popover';
import { cn } from '../../../lib';

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  onChange,
  value,
  disabled = false,
  placeholder = 'تاریخ و زمان را انتخاب کنید',
  granularity = 'minute',
  className,
  outputFormat = 'YYYY-MM-DDTHH:mm',
  displayFormat,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>();

  useEffect(() => {
    if (value) setDate(moment(value).toDate());
  }, [value]);

  const handleDateSelect = (selectedDate?: Date) => {
    if (!selectedDate) return;
    if (date) {
      selectedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds()
      );
    }
    setDate(selectedDate);
    onChange?.(moment(selectedDate).format(outputFormat));
  };

  const handleTimeChange = (newDate?: Date) => {
    if (!newDate) return;
    setDate(newDate);
    onChange?.(moment(newDate).format(outputFormat));
  };

  const getDisplayValue = () => {
    if (!date) return '';
    if (displayFormat) return moment(date).format(displayFormat);
    return moment(date).format(
      `jYYYY/jMM/jDD HH:mm${granularity === 'second' ? ':ss' : ''}`
    );
  };

  return (
    <div className="relative flex w-full gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="w-full" disabled={disabled}>
          <AIBInput
            value={getDisplayValue()}
            placeholder={placeholder}
            className={cn('cursor-pointer', className)}
            onChange={() => undefined}
            endAdornment={
              <Button variant="ghost" size="icon" type="button">
                <CalendarIcon className="size-5" />
              </Button>
            }
          />
        </PopoverTrigger>
        <PopoverContent align="center">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            onSelect={handleDateSelect}
          />
          {granularity !== 'day' && (
            <div className="border-t border-border pt-4">
              <TimePicker
                date={date}
                onChange={handleTimeChange}
                granularity={granularity}
                onConfirm={() => setOpen(false)}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  );
};
