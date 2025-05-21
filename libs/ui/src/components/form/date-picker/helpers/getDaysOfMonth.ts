import moment from 'moment-jalaali';

export const getDaysOfMonth = ({
  month,
  year,
}: {
  month: number;
  year: number;
}) => {
  if (month > 12) {
    const validateMonth = month % 12;
    const validateYear = year + 1;
    return moment.jDaysInMonth(validateYear, validateMonth);
  } else {
    return moment.jDaysInMonth(year, month - 1);
  }
};
