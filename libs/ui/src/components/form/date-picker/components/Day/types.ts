import { IDate } from '../../types';

export interface ISelectableDay {
  day: IDate;
  selectedDate: string[];
  onClick: (agr: string) => void;
  today: string;
  min?: string;
  max?: string;
}
