export interface IProgressbarProps {
  variant?: 'incremental' | 'decremental';
  min: number;
  max: number;
  value: number;
  suffix?: string;
  size: 'thick' | 'thin';
}
