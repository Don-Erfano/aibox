export interface IDatePicker {
  onChange: (date: string | string[]) => void;
  value: string;
  label: string;
  isMulti?: boolean;
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
