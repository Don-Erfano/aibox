import { Dispatch, SetStateAction } from 'react';
import { IcurrentDate } from '../components/Header/types';
import { ECalendarState } from '../types';

export interface IDatePickerCtx {
  setCalendarState: Dispatch<SetStateAction<ECalendarState>>;
  today: string;
  currentDate: IcurrentDate;
  setCurrentDate: Dispatch<SetStateAction<IcurrentDate>>;
  datePickerValue: string[];
  min?: string;
  max?: string;
}
