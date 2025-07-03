import { Control, FieldValues, Path } from 'react-hook-form';

export interface IDatePicker {
  onChange: (date: string[]) => void;
  value: string[];
  label?: string;
  isMulti?: boolean;
  min?: string;
  max?: string;
}

export interface IPortalProps {
  containerId?: string;
}

export interface IDate {
  day: {
    j: string;
    g: string;
    h: string;
  };
  WeekDay: {
    day: string;
    value: number;
  };
  month: {
    j: string;
    g: string;
    h: string;
  };
  year: {
    j: string;
    g: string;
    h: string;
  };
}

export interface IDaysOfCurrentMonth {
  month: number;
  year: number;
}

export interface IWeekDays {
  value: number;
  day: string;
}

export enum ECalendarState {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
}

export interface IRhfDatePicker<TFieldValues extends FieldValues> {
  control?: Control<TFieldValues>;
  name: Path<TFieldValues>;
  label?: string;
  isMulti?: boolean;
}
