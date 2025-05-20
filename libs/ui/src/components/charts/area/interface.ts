export interface DataPoint {
  x: string;
  y: number;
}

export interface IChartProps {
  className?: string;
  data: DataPoint[];
  title?: string;
  height?: number;
  lineColor?: string;
  fillColor?: string;
  enableTooltip?: boolean;
}
