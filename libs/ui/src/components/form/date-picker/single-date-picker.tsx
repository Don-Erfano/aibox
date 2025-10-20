"use client";

import moment from "moment-jalaali";
import { FC, useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";

import { Button } from "../button";
import { AIBInput } from "../input";
import { Calendar } from "../../calendar";
import { ISingleDatePickerProps } from "./interface";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import clsx from "clsx";

export const SingleDatePicker: FC<ISingleDatePickerProps> = ({
  onChange,
  value,
  error,
  onBlur,
  disabled,
  readOnly,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>();
  const [month, setMonth] = useState<Date | undefined>();

  useEffect(() => {
    if (value) {
      setDate(new Date(value));
    }
  }, [value]);

  const handleChange = (d?: Date) => {
    onChange(moment(d).format("YYYY-MM-DD"));
  };

  return (
    <div className="relative flex w-full gap-2">
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <PopoverTrigger className="w-full">
          <AIBInput
            id="date"
            value={date ? moment(date).format("jYYYY/jMM/jDD") : ""}
            className="cursor-pointer"
            onChange={() => undefined}
            aria-invalid={error}
            onBlur={onBlur}
            aria-disabled={disabled}
            disabled={disabled}
            readOnly={readOnly}
            endAdornment={
              <Button
                id="date-picker"
                variant="ghost"
                size="icon"
                type="button"
                disabled={readOnly || disabled}
              >
                <CalendarIcon
                  className={clsx("size-5", { "text-red-600": error })}
                />
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
            disabled={readOnly || disabled}
            onSelect={(d) => {
              setDate(d);
              setOpen(false);
              handleChange(d);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
