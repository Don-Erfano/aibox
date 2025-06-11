export interface IDonutChartProps {
  title?: string;
  showLegends?: boolean;
  total?: {
    value: string | number;
    label?: string;
    suffix?: string;
    suffixColor?: string;
  };
  data: {
    id: string;
    name: string;
    amount: number;
  }[];
  loading?: boolean;
  colors?: string[];
}
