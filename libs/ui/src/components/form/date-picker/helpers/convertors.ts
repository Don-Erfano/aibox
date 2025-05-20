import moment from 'moment-jalaali';

export const jalaliToDateTime = (date: string) =>
  moment(`${date} 00:00:00`, 'jYYYY/jM/jD HH:mm:00').format();
