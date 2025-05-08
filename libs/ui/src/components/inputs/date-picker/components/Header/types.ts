import { Dispatch, SetStateAction } from 'react';

export interface IcurrentDate {
  year: number;
  month: number;
}
export interface IDatePickerHeader {
  currentDate: IcurrentDate;
  setCurrentDate: Dispatch<SetStateAction<IcurrentDate>>;
  show: boolean;
}
