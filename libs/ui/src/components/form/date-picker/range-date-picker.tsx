"use client";

import moment from "moment-jalaali";
import { FC, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { Button } from "../button";
import { AIBInput } from "../input";
import { Calendar } from "../../calendar";
import { IRangeDatePicker } from "./interface";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import clsx from "clsx";

export const RangeDatePicker: FC<IRangeDatePicker> = ({
  onChange,
  error,
  onBlur,
  disabled,
  readOnly,
}) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date | undefined>(date?.from);

  return (
    <div className="relative flex w-full gap-2">
      <Popover open={open} onOpenChange={(open) => setOpen(open)}>
        <PopoverTrigger className="w-full" asChild>
          <AIBInput
            id="date"
            value={`${moment(date?.from).format("jYYYY/jMM/jDD")} - ${moment(date?.to).format("jYYYY/jMM/jDD")}`}
            className="cursor-pointer"
            aria-invalid={error}
            onBlur={onBlur}
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
            mode="range"
            selected={date}
            captionLayout="dropdown"
            month={month}
            onMonthChange={setMonth}
            disabled={readOnly || disabled}
            onSelect={(d) => {
              setDate(d);
              onChange({
                from: d?.from?.toISOString(),
                to: d?.to?.toISOString(),
              });
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
