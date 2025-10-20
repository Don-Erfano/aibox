"use client";

import { CalendarIcon, XCircle } from "lucide-react";
import type { DateRange } from "react-day-picker";

import { Separator } from "../../separator";
import { Popover, PopoverContent, PopoverTrigger } from "../../popover";
import { Button } from "../../form";
import { Calendar } from "../../calendar";
import { formatDate } from "../lib/formatDate";
import { DateSelection, TableDateFilterProps } from "../types";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Badge } from "../../badges";

function getIsDateRange(value: DateSelection): value is DateRange {
  return value && typeof value === "object" && !Array.isArray(value);
}

function parseAsDate(timestamp: number | string | undefined): Date | undefined {
  if (!timestamp) return undefined;
  const numericTimestamp =
    typeof timestamp === "string" ? Number(timestamp) : timestamp;
  const date = new Date(numericTimestamp);
  return !Number.isNaN(date.getTime()) ? date : undefined;
}

function parseColumnFilterValue(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    "type" in value
  ) {
    const dateRangeValue = value as {
      type: "dateRange";
      from?: number;
      to?: number;
      columnId: string;
    };

    if (dateRangeValue.type === "dateRange") {
      return [dateRangeValue.from, dateRangeValue.to];
    }
  }

  if (value === null || value === undefined) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "number" || typeof item === "string") {
        return item;
      }
      return undefined;
    });
  }

  if (typeof value === "string" || typeof value === "number") {
    return [value];
  }

  return [];
}

export function DataTableDateFilter<TData>({
  column,
  title,
  multiple,
}: TableDateFilterProps<TData>) {
  const columnFilterValue = column.getFilterValue();

  const selectedDates = useMemo<DateSelection>(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : [];
    }

    if (multiple) {
      const timestamps = parseColumnFilterValue(columnFilterValue);
      return {
        from: parseAsDate(timestamps[0]),
        to: parseAsDate(timestamps[1]),
      };
    }

    if (typeof columnFilterValue === "number") {
      const date = parseAsDate(columnFilterValue);
      return date ? [date] : [];
    }

    const timestamps = parseColumnFilterValue(columnFilterValue);
    const date = parseAsDate(timestamps[0]);
    return date ? [date] : [];
  }, [columnFilterValue, multiple]);

  const [month, setMonth] = useState<Date | undefined>(() => {
    if (multiple && getIsDateRange(selectedDates)) {
      return selectedDates.from || selectedDates.to || new Date();
    }
    if (!multiple && Array.isArray(selectedDates) && selectedDates.length > 0) {
      return selectedDates[0];
    }
    return new Date();
  });

  useEffect(() => {
    if (multiple && getIsDateRange(selectedDates)) {
      const targetDate = selectedDates.from || selectedDates.to;
      if (targetDate) {
        setMonth(targetDate);
      }
    } else if (
      !multiple &&
      Array.isArray(selectedDates) &&
      selectedDates.length > 0
    ) {
      setMonth(selectedDates[0]);
    }
  }, [selectedDates, multiple]);

  const onSelect = useCallback(
    (date: Date | DateRange | undefined) => {
      if (!date) {
        column.setFilterValue(undefined);
        return;
      }

      if (multiple && !("getTime" in date)) {
        // Handle date range
        const from = date.from?.getTime();
        const to = date.to?.getTime();

        if (from || to) {
          column.setFilterValue({
            type: "dateRange",
            from: from,
            to: to,
            columnId: column.id,
          });
        } else {
          column.setFilterValue(undefined);
        }
      } else if (!multiple && "getTime" in date) {
        column.setFilterValue(date.getTime());
      }
    },
    [column, multiple],
  );

  const onReset = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      column.setFilterValue(undefined);
    },
    [column],
  );

  const hasValue = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return false;
      return selectedDates.from || selectedDates.to;
    }
    if (!Array.isArray(selectedDates)) return false;
    return selectedDates.length > 0;
  }, [multiple, selectedDates]);

  const formatDateRange = useCallback((range: DateRange) => {
    if (!range.from && !range.to) return "";
    if (range.from && range.to) {
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return formatDate(range.from ?? range.to);
  }, []);

  const label = useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) return null;

      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText = hasSelectedDates
        ? formatDateRange(selectedDates)
        : "Select date range";

      return (
        <span className="flex items-center gap-2">
          <span>{title}</span>
          {hasSelectedDates && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge variant="filter">{dateText}</Badge>
            </>
          )}
        </span>
      );
    }

    if (getIsDateRange(selectedDates)) return null;

    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate
      ? formatDate(selectedDates[0])
      : "Select date";

    return (
      <span className="flex items-center gap-2">
        <span>{title}</span>
        {hasSelectedDate && (
          <>
            <Separator
              orientation="vertical"
              className="mx-0.5 data-[orientation=vertical]:h-4"
            />
            <Badge variant="filter">{dateText}</Badge>
          </>
        )}
      </span>
    );
  }, [selectedDates, multiple, formatDateRange, title]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="subtle" size="sm" className="h-10">
          {hasValue ? (
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
            >
              <XCircle />
            </div>
          ) : (
            <CalendarIcon />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        {multiple ? (
          <Calendar
            captionLayout="dropdown"
            mode="range"
            selected={
              getIsDateRange(selectedDates)
                ? selectedDates
                : { from: undefined, to: undefined }
            }
            month={month}
            onMonthChange={setMonth}
            onSelect={onSelect}
          />
        ) : (
          <Calendar
            captionLayout="dropdown"
            mode="single"
            selected={
              !getIsDateRange(selectedDates) ? selectedDates[0] : undefined
            }
            month={month}
            onMonthChange={setMonth}
            onSelect={onSelect}
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
