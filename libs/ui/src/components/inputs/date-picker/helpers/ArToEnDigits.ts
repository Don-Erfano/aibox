const arabicNums = [
  { ar: '١', en: '1' },
  { ar: '٢', en: '2' },
  { ar: '٣', en: '3' },
  { ar: '٤', en: '4' },
  { ar: '٥', en: '5' },
  { ar: '٦', en: '6' },
  { ar: '٧', en: '7' },
  { ar: '٨', en: '8' },
  { ar: '٩', en: '9' },
  { ar: '٠', en: '0' },
];

export const toEnDigit = (s: string) =>
  s.replace(/[٠-٩]/g, (n) =>
    String(arabicNums.find((item) => item.ar === n)?.en)
  );
