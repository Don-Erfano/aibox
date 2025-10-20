'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Button } from '../button';
import { TimePickerInput } from './time-picker-input';
import { TimePickerProps, TimePickerRef } from './interface';

export const TimePicker = forwardRef<TimePickerRef, TimePickerProps>(
  ({ date, onChange, granularity = 'minute', onConfirm }, ref) => {
    const minuteRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const secondRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
      minuteRef: minuteRef.current,
      hourRef: hourRef.current,
      secondRef: secondRef.current,
    }));

    return (
      <div className="flex flex-row-reverse items-center justify-between">
        <div className="flex flex-row-reverse items-center gap-1">
          <TimePickerInput
            picker="hours"
            date={date}
            id="datetime-picker-hour-input"
            onDateChange={onChange}
            ref={hourRef}
            onRightFocus={() => minuteRef?.current?.focus()}
          />
          {(granularity === 'minute' || granularity === 'second') && (
            <div className="flex flex-row-reverse items-center gap-1">
              <span className="text-lg font-semibold">:</span>
              <TimePickerInput
                picker="minutes"
                date={date}
                onDateChange={onChange}
                ref={minuteRef}
                onLeftFocus={() => hourRef?.current?.focus()}
                onRightFocus={() => secondRef?.current?.focus()}
              />
            </div>
          )}
          {granularity === 'second' && (
            <div className="flex flex-row-reverse items-center gap-1">
              <span className="text-lg font-semibold">:</span>
              <TimePickerInput
                picker="seconds"
                date={date}
                onDateChange={onChange}
                ref={secondRef}
                onLeftFocus={() => minuteRef?.current?.focus()}
              />
            </div>
          )}
        </div>
        <Button
          variant="outline"
          isFilled
          className="ml-2 h-10"
          onClick={onConfirm}
        >
          تایید
        </Button>
      </div>
    );
  }
);

TimePicker.displayName = 'TimePicker';
