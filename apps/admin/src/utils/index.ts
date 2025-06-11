export const convertPersianNumberToEnglish = (str: string): string => {
  const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return str.replace(/[۰-۹]/g, (char) => {
    const index = persianNumbers.indexOf(char);
    return index > -1 ? englishNumbers[index] : char;
  });
};
