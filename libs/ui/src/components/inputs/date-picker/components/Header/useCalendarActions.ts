import { IDatePickerHeader } from './types';

export const useCalendar = ({
  currentDate,
  setCurrentDate,
}: Omit<IDatePickerHeader, 'show'>) => {
  const onClickNextMonth = () => {
    if (currentDate.month === 12) {
      setCurrentDate({
        year: currentDate.year + 1,
        month: 1,
      });
    } else {
      setCurrentDate({
        ...currentDate,
        month: currentDate.month + 1,
      });
    }
  };

  const onClickPrevioustMonth = () => {
    if (currentDate.month === 1) {
      setCurrentDate({
        year: currentDate.year - 1,
        month: 12,
      });
    } else {
      setCurrentDate({
        ...currentDate,
        month: currentDate.month - 1,
      });
    }
  };
  const onClickNextYear = () => {
    setCurrentDate({
      ...currentDate,
      year: currentDate.year + 1,
    });
  };

  const onClickPreviousYear = () => {
    setCurrentDate({
      ...currentDate,
      year: currentDate.year - 1,
    });
  };

  return {
    onClickNextMonth,
    onClickPreviousYear,
    onClickNextYear,
    onClickPrevioustMonth,
  };
};
