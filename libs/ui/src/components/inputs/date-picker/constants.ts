import { IWeekDays } from './types';

export const jalaliDateFormat = 'jYYYY/jM/jD';
export const gregorianDateFormat = 'YYYY-M-D';

export const week_days: Array<IWeekDays> = [
  {
    day: 'یکشنبه',
    value: 0,
  },
  {
    day: 'دوشنبه',
    value: 1,
  },
  {
    day: 'سه‌شنبه',
    value: 2,
  },
  {
    day: 'چهارشنبه',
    value: 3,
  },
  {
    day: 'پنج‌شنبه',
    value: 4,
  },
  {
    day: 'جمعه',
    value: 5,
  },
  {
    day: 'شنبه',
    value: 6,
  },
];

export const jalaliMonth: Array<string> = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export const georgianMonth: Array<string> = [
  'January',
  'Febuary',
  'March',
  'April',
  'May',
  'June',
  'Julay',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const hijiMonthes: Array<string> = [
  'مُحَرَّمُ',
  'صَفَرُ',
  'رَبِيْعُ الْأَوَّلِ',
  'رَبِيْعُ الثَّانِي',
  'جُمَادَى الْأُوْلَىٰ',
  'جُمَادَى الْآخِرَةُ',
  'رَجَبُ',
  'شَعْبَانُ',
  'رَمَضَانُ',
  'شَوَّالُ',
  'ذُو الْقَعْدَةِ',
  'ذُو الْحِجَّةِ',
];

export const weekDaysInRow = [
  'شنبه',
  'یک‌‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهارشنبه',
  'پنج‌شنبه',
  'جمعه',
];
