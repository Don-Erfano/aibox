'use client';

import { forwardRef, useEffect, useMemo, useState } from 'react';
import { AIBInput } from '../input';
import { getDateByType, getArrowByType, setDateByType } from './utils';
import { TimePickerInputProps } from './interface';
import { cn } from '../../../lib';

export const TimePickerInput = forwardRef<
  HTMLInputElement,
  TimePickerInputProps
>(
  (
    {
      className,
      type = 'tel',
      value,
      id,
      name,
      date = new Date(new Date().setHours(0, 0, 0, 0)),
      onDateChange,
      onChange,
      onKeyDown,
      picker,
      onLeftFocus,
      onRightFocus,
      ...props
    },
    ref
  ) => {
    const [flag, setFlag] = useState<boolean>(false);

    useEffect(() => {
      if (flag) {
        const timer = setTimeout(() => setFlag(false), 2000);
        return () => clearTimeout(timer);
      }
      return () => null;
    }, [flag]);

    const calculatedValue = useMemo(
      () => getDateByType(date, picker),
      [date, picker]
    );

    const calculateNewValue = (key: string) =>
      !flag ? `0${key}` : calculatedValue.slice(1, 2) + key;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Tab') return;
      e.preventDefault();
      if (e.key === 'ArrowRight') onRightFocus?.();
      if (e.key === 'ArrowLeft') onLeftFocus?.();
      if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
        const step = e.key === 'ArrowUp' ? 1 : -1;
        const newValue = getArrowByType(calculatedValue, step, picker);
        if (flag) setFlag(false);
        const tempDate = date ? new Date(date) : new Date();
        onDateChange?.(setDateByType(tempDate, newValue, picker));
      }
      if (e.key >= '0' && e.key <= '9') {
        const newValue = calculateNewValue(e.key);
        if (flag) onRightFocus?.();
        setFlag((prev) => !prev);
        const tempDate = date ? new Date(date) : new Date();
        onDateChange?.(setDateByType(tempDate, newValue, picker));
      }
    };

    return (
      <AIBInput
        ref={ref}
        id={id || picker}
        name={name || picker}
        className={cn(
          'h-[40px] w-[40px] text-center tabular-nums caret-transparent focus:bg-accent focus:text-accent-foreground [&::-webkit-inner-spin-button]:appearance-none',
          className
        )}
        value={value || calculatedValue}
        onChange={(e) => {
          e.preventDefault();
          onChange?.(e);
        }}
        type={type}
        inputMode="decimal"
        onKeyDown={(e) => {
          onKeyDown?.(e);
          handleKeyDown(e);
        }}
        {...props}
      />
    );
  }
);

TimePickerInput.displayName = 'TimePickerInput';
